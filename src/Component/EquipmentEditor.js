import Uploader from "../Functions/Uploader";
import {Editor} from "@tinymce/tinymce-react";
import {useRef, useState} from "react";
import fileIcon from "../Picture/fileIcon.png";
import MessageModal from "./MessageModal";

const EquipmentEditor = ({ index, content, tabContents }) => {
    const editorRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    return(
        <>
        <MessageModal show={showProgress}
                      message={"Uploading Files, dont close the window! Progress: " + progress + "%"}
                      handleClose={() => setShowProgress(false)}/>

        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            onChange={() => tabContents[index] = editorRef.current.getContent()}
            apiKey="ss9xuyjb5f9h3evt41gz1yxf2nqw2ovqjcr5sozwce6p64dy"
            initialValue={content}
            init={{
                height: 300,
                menubar: false,
                automatic_uploads: false,
                relative_urls: false,
                plugins: [
                    'advlist autolink lists link image charmap print anchor help',
                    'searchreplace insertdatetime media table paste wordcount'
                ],

                toolbar:
                    'undo redo | formatselect | fontselect | fontsizeselect | bold italic | alignleft aligncenter alignright | ' +
                    'bullist numlist outdent indent | table | link image media fileUploader | help',

                audio_template_callback: function(data){
                    return '<audio style="width: 100%;" controls><source src="' + data.source + '"' + (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') + ' />\n' + (data.altsource ? '<source src="' + data.altsource + '"' + (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') + ' />\n' : '') + '</audio>';
                },

                file_picker_callback: function(callback) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.onchange = function() {
                        const file = this.files;
                        const reader = new FileReader();
                        reader.readAsDataURL(this.files[0]);
                        reader.onload = function () {
                            setShowProgress(true);
                            return Uploader.uploadFiles(file, (event) => setProgress(Math.round((100 * event.loaded) / event.total))).then((response)=>{
                                callback(response, {fileName: file[0].name});
                                setShowProgress(false);
                                setProgress(0);
                            });
                        };
                    };
                    input.click();
                },

                setup: function (editor) {
                    editor.on('NodeChange', function(e) {
                        if (e.element.nodeName.toLowerCase() === 'img' && !e.element.hasAttribute("initialized")) {
                            let width = e.element.width;
                            let height = e.element.height;
                            if (width > 300) {
                                height = "100%";
                                width = "100%";
                            }
                            editor.dom.setAttribs(e.element, {'width': width, 'height': height, 'initialized': 'true'});
                        }else if(e.element.childElementCount > 0 && !e.element.firstElementChild.hasAttribute("initialized")){
                            const element = e.element.firstElementChild;
                            if(element.nodeName.toLocaleLowerCase() === 'iframe'){
                                let width = element.getAttribute('width');
                                let height = element.getAttribute('height');
                                if (width > 300) {
                                    height = height / (width / 300);
                                    width = 300;
                                }
                                editor.dom.setAttribs(element, {'width': width, 'height': height, 'initialized': 'true'});
                            }else if(element.nodeName.toLocaleLowerCase() === 'video'){
                                let width = element.getAttribute('width');
                                let height = element.getAttribute('height');
                                if (width > 300) {
                                    height = "100%";
                                    width = "100%";
                                }
                                editor.dom.setAttribs(element, {'width': width, 'height': height, 'initialized': 'true'});
                            }else if(element.nodeName.toLocaleLowerCase() === 'audio'){
                                editor.dom.setAttribs(e.element, {'style': 'width: 100%', 'initialized': 'true'});
                            }
                        }
                    });

                    //urlinput will call filepicker
                    editor.ui.registry.addButton("fileUploader", {
                        tooltip: "Upload Files",
                        icon: "new-document",
                        onAction: function() {
                            editor.windowManager.open({
                                title: 'Upload Files',
                                body: {
                                    type: 'panel',
                                    items: [
                                        {
                                            type: 'urlinput',
                                            name: 'fileUploader',
                                            label: 'File Uploader',
                                            filetype: 'file',
                                        },
                                    ]
                                },
                                buttons: [
                                    {
                                        text: 'Close',
                                        type: 'cancel',
                                        onclick: 'close'
                                    },
                                    {
                                        text: 'Confirm',
                                        type: 'submit',
                                        primary: true,
                                    }
                                ],

                                onSubmit: function (api) {
                                    const fileData = api.getData().fileUploader;
                                    editor.insertContent('<p><img src = "' + fileIcon + '" alt="file"/><a href="' + fileData.value + '">' + fileData.meta.fileName + '</a></p>');
                                    api.close();
                                },
                            });
                        },
                    });
                },

            }}
        />
        </>
    );
}

export default EquipmentEditor;