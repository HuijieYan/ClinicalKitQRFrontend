import {Form, Container, Button, Row, Col, Accordion} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import React, {useRef, useState} from "react";
import $ from 'jquery';
import FileUploader from "../Functions/FileUploader";

const EditEquipment = (props) => {
    const {equipmentName, id} = props;
    const [content,setContent] = useState("");

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
        editorRef.current.setContent('<Accordion><Accordion.Item eventKey=\"0\"><Accordion.Header>Accordion Item #1</Accordion.Header><Accordion.Body>First block</Accordion.Body></Accordion.Item><Accordion.Item eventKey=\"1\"><Accordion.Header>Accordion Item #2</Accordion.Header><Accordion.Body>Second block</Accordion.Body></Accordion.Item></Accordion>');

        /*$("#dataContainer").html(editorRef.current.getContent());*/
    };

    return (
        <Container style={{borderStyle: "solid", marginTop: "1%", borderColor: "grey"}}>
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
                        link image media fileUploader | insertAnnouncement insertNewTab | \
                        preview | print | help',

                    images_upload_handler: image_upload_handler,

                    video_template_callback: function(data) {
                        return "<iframe src=\"" + data.source + "\" width=\"" + data.width + "\" height=\"" + data.height + "\" allowfullscreen=\"allowfullscreen\"></iframe>";
                    },

                    file_picker_callback: function(callback, value, meta) {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');

                        input.onchange = function() {
                            const file = this.files[0];
                            const reader = new FileReader();

                            const data = new FormData();
                            data.append('filetype',meta.filetype);
                            data.append("file",file);
                            reader.onload = function (e) {
                                /*const id = 'blobid' + (new Date()).getTime();
                                const blobCache = editorRef.current.editorUpload.blobCache;
                                const base64 = reader.result.split(',')[1];
                                const blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name
                                callback(blobInfo.blobUri(), { title: file.name });*/

                                //location
                                callback();
                            };
                            reader.readAsDataURL(file);
                        };

                        input.click();
                    },

                    setup: function (editor) {
                        editor.ui.registry.addButton("insertAnnouncement", {
                            tooltip: "Add Announcement",
                            icon: "comment-add",
                            onAction: function() {
                                editor.windowManager.open({
                                    title: 'Announcement',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'input',
                                                name: 'header',
                                                label: 'Header',
                                            },
                                            {
                                                type: 'textarea',
                                                name: 'content',
                                                label: 'Content',
                                            }
                                        ]
                                    },
                                    buttons: [
                                        {
                                            text: 'Close',
                                            type: 'cancel',
                                            onclick: 'close'
                                        },
                                        {
                                            text: 'Insert',
                                            type: 'submit',
                                            primary: true,
                                            enabled: false
                                        }
                                    ],
                                    onSubmit: function (api) {
                                        const data = api.getData();
                                        editor.insertContent('<div style="margin: 1%; background-color: lightgray; border-style: solid; border-width: 1px"><h2 style="color: lightskyblue">' + data.header + '</h2><p>' + data.content + '</p></div><p></p>');
                                        /*editor.insertContent('<p>' + data.header + data.content + '</p>');*/
                                        // close the dialog
                                        api.close();
                                    },
                                });
                            },
                        });

                        editor.ui.registry.addButton("insertNewTab", {
                            tooltip: "Add Tab",
                            icon: "new-tab",
                            onAction: function() {
                                editor.windowManager.open({
                                    title: 'Add Tab',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'input',
                                                name: 'tabHeader',
                                                label: 'Tab Header',
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
                                                type: 'dropzone',
                                                name: 'file uploader',
                                                label: 'file uploader',
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
                                        // close the dialog
                                        api.close();
                                    },
                                });
                            },
                        });

                    },

                }}
            />

            <Button style={{marginTop: "5%"}} onClick={log}>Save</Button>

            <div>
                <Form.Label id="dataContainer" style={{}}>{content}</Form.Label>
            </div>

            <Accordion><Accordion.Item eventKey="0"><Accordion.Header>Accordion Item #1</Accordion.Header><Accordion.Body>First block</Accordion.Body></Accordion.Item><Accordion.Item eventKey="1"><Accordion.Header>Accordion Item #2</Accordion.Header><Accordion.Body>Second block</Accordion.Body></Accordion.Item></Accordion>
        </Container>
    );
}

export default EditEquipment;