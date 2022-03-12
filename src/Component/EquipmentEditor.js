import Uploader from "../Functions/Uploader";
import {Editor} from "@tinymce/tinymce-react";
import {useRef} from "react";
import fileIcon from "../Picture/fileIcon.png";

const EquipmentEditor = ({ index, content, tabContents }) => {
    const editorRef = useRef(null);

    function image_upload_handler (blobInfo, success, failure, progress) {
        return Uploader.uploadFiles([blobInfo.blob()]).then((responese)=>{
            return success(responese.location);
        });
    }

    return(
        <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            onChange={() => tabContents[index] = editorRef.current.getContent()}
            apiKey="ss9xuyjb5f9h3evt41gz1yxf2nqw2ovqjcr5sozwce6p64dy"
            initialValue={content}
            init={{
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print anchor help',
                    'searchreplace insertdatetime media table paste wordcount'
                ],

                toolbar:
                    'undo redo | formatselect | bold italic | alignleft aligncenter alignright | ' +
                    'bullist numlist outdent indent | table | link image media fileUploader | ' +
                    'print | help',

                images_upload_handler: image_upload_handler,

                file_picker_callback: function(callback, value, meta) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');

                    input.onchange = function() {
                        const file = this.files;
                        const reader = new FileReader();

                        reader.onload = function () {
                            return Uploader.uploadFiles(file).then((responese)=>{
                                callback(responese.location);
                            });
                        };
                        reader.readAsDataURL(this.files[0]);
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
                                        text: 'Upload',
                                        type: 'submit',
                                        primary: true,
                                        enabled: false
                                    }
                                ],

                                onSubmit: function (api) {
                                    const data = api.getData();
                                    editor.insertContent('<p><img src = "' + fileIcon + '" alt="file"/><a href="'+ data.fileUploader.value +'">file</a></p>');
                                    api.close();
                                },
                            });
                        },
                    });
                },

            }}
        />
    );
}

export default EquipmentEditor;