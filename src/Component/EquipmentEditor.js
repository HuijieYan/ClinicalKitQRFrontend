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
                    'undo redo | formatselect | bold italic | alignleft aligncenter alignright | ' +
                    'bullist numlist outdent indent | table | link image media fileUploader | ' +
                    'print | help',

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
                                setShowProgress(false);
                                setProgress(0);
                                callback(response, {fileName: file[0].name});
                            });
                        };
                    };
                    input.click();
                },

                setup: function (editor) {
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