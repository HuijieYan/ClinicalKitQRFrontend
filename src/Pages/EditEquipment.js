import {Form, Container, Button, Row, Col, Accordion, Card} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import React, {useRef, useState} from "react";
import $ from 'jquery';
import FileUploader from "../Functions/FileUploader";
import "bootstrap/dist/css/bootstrap.min.css";

const EditEquipment = (props) => {
    const {equipmentName, id} = props;
    const [content,setContent] = useState("");
    const [tabNum, setTabNum] = useState(0);

    function image_upload_handler (blobInfo, success, failure, progress) {
        /*console.log("ih");
        console.log(blobInfo.filename());*/
        return FileUploader.uploadFiles([blobInfo.blob()]).then((responese)=>{
            console.log(responese);
            return success(responese.location);
        });
    }

    const editorRef = useRef(null);
    const log = () => {
        /*setContent(editorRef.current.getContent());*/

        //save this to database
        editorRef.current.getContent();

        /*$("#dataContainer").html(editorRef.current.getContent());*/
    };

    return (
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey"}}>
            <Form style={{marginTop: '3%', marginBottom: '3%'}}>
                <Row>
                    <Col xl={2}>
                        <Form.Group style={{textAlign: 'left', fontSize: 'x-large'}}>
                            <Form.Label style={{color: 'gray', textAlign: 'left', fontSize: 'x-large'}}>Equipment Name:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Control type="text" value={equipmentName}/>
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>User Group:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}}>
                            <option value="-1" label="Select Trust"/>
                            <option value="0" label="User Group 1"/>
                            <option value="1" label="User Group 2"/>
                            <option value="2" label="User Group 3"/>
                            <option value="3" label="User Group 4"/>
                        </select>
                    </Col>
                </Row>


                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Equipment Type:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}}>
                            <option value="-1" label="Select Type"/>
                            <option value="0" label="Type 1"/>
                            <option value="1" label="Type 2"/>
                            <option value="2" label="Type 3"/>
                        </select>
                    </Col>
                </Row>
            </Form>

            <Row  style={{textAlign: 'left', fontSize: 'x-large'}}>
                <Col>
                    <Form.Label style={{color: 'gray'}}>Additional Description:</Form.Label>
                </Col>
            </Row>

            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey="ss9xuyjb5f9h3evt41gz1yxf2nqw2ovqjcr5sozwce6p64dy"
                initialValue="<p>Content</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor help',
                        'searchreplace visualblocks code insertdatetime media table paste wordcount'
                    ],

                    toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | table | \
                        link image media fileUploader | insertNewTab | \
                        preview | print | help',

                    images_upload_handler: image_upload_handler,

                    /*video_template_callback: function(data) {
                        return "<iframe src=\"" + data.source + "\" width=\"" + data.width + "\" height=\"" + data.height + "\" allowfullscreen=\"allowfullscreen\"></iframe>";
                    },*/

                    file_picker_callback: function(callback, value, meta) {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');

                        input.onchange = function() {
                            const file = this.files;
                            const reader = new FileReader();

                            /*const data = new FormData();
                            data.append('filetype',meta.filetype);
                            data.append("file",file);*/
                            reader.onload = function (e) {
                                /*const id = 'blobid' + (new Date()).getTime();
                                const blobCache = editorRef.current.editorUpload.blobCache;
                                const base64 = reader.result.split(',')[1];
                                const blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name
                                callback(blobInfo.blobUri(), { title: file.name });*/

                                //location
                                return FileUploader.uploadFiles(file).then((responese)=>{
                                    console.log(responese);
                                    callback(responese.location);
                                });
                            };
                            reader.readAsDataURL(this.files[0]);
                        };

                        input.click();
                    },

                    setup: function (editor) {
                        editor.ui.registry.addButton("insertNewTab", {
                            tooltip: "Add Tab",
                            icon: "comment-add",
                            onAction: function() {
                                editor.windowManager.open({
                                    title: 'Add Tab',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'input',
                                                name: 'tabTitle',
                                                label: 'Tab Title',
                                            },
                                            {
                                                type: 'input',
                                                name: 'tabContent',
                                                label: 'Tab Content',
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
                                            text: 'Add',
                                            type: 'submit',
                                            primary: true,
                                            enabled: false
                                        }
                                    ],
                                    onSubmit: function (api) {
                                        const data = api.getData();
                                        // close the dialog
                                        editor.insertContent('<div style="background-color: #d1d1d1"><h2>' + data.tabTitle + '</h2><p>' + data.tabContent + '</p></div><p></p>');
                                        api.close();
                                    },
                                });
                            },
                        });

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

                                    onChange: function (api, changeData) {
                                        const data = api.getData();
                                        console.log("onchange");
                                        console.log(data);
                                    },

                                    onSubmit: function (api) {
                                        const data = api.getData();
                                        editor.insertContent('<p><img src="https://i.ibb.co/8rfqJw1/icons8-file-16.png" alt="file"/><a href="'+ data.fileUploader.value +'">file</a></p>');
                                        api.close();
                                    },
                                });
                            },
                        });

                    },

                }}
            />

            <Button style={{marginTop: "3%", marginBottom: "1%"}} onClick={log}>Save</Button>

            {/*<div>
                <Form.Label id="dataContainer">{content}</Form.Label>
            </div>*/}


            {/*<Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>*/}

        </Container>
    );
}

export default EditEquipment;