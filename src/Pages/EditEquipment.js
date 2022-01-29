import {Form, Container, Button, Row, Col, FormControl, FormGroup} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import React, {useRef, useState} from "react";
import $ from 'jquery';
import FileUploader from "../Functions/FileUploader";

const EditEquipment = (props) => {
    const {equipmentName, id} = props;
    const [content,setContent] = useState("");

    function example_image_upload_handler (blobInfo, success, failure, progress) {
        console.log("ih");
        console.log(blobInfo.filename());
        return FileUploader.uploadFiles([blobInfo.blob()]).then((responese)=>{
            console.log(responese);
            return success(responese.location);
        });
        
        
    }

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            $("#dataContainer").html(editorRef.current.getContent());
        }
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
                        link | preview | image | print | help',

                    images_upload_handler: example_image_upload_handler

                }}
            />

            <FormControl id="formControlsFile"
                         type="file"
                         label="File" />

            <Button style={{marginTop: "5%"}} onClick={log}>Save</Button>

            <div>
                <Form.Label id="dataContainer" style={{}}>{content}</Form.Label>
            </div>
        </Container>
    );
}

export default EditEquipment;