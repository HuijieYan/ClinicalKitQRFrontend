import {Form, Container, Button, Row, Col} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import React, {useEffect, useRef, useState} from "react";
import Uploader from "../Functions/Uploader";
import "bootstrap/dist/css/bootstrap.min.css";
import GetData from "../Functions/GetData";
import {useHistory} from "react-router-dom";

const EditEquipment = (props) => {
    const {id} = props;
    const [content,setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState("");
    const [type,setType] = useState("Select Type");
    const [types,setTypes] = useState([]);
    const [category,setCategory] = useState("Select Category");
    const [categories,setCategories] = useState([]);

    function image_upload_handler (blobInfo, success, failure, progress) {
        return Uploader.uploadFiles([blobInfo.blob()]).then((responese)=>{
            console.log(responese);
            return success(responese.location);
        });
    }

    useEffect(() => {
        GetData.getTypes().then((data) => {
            setTypes(data)
        });
        GetData.getCategories().then((categories)=>{
            setCategories(categories);
        });

        console.log(id);
        if(id != null){
            GetData.getEquipmentById(id).then((data) => {
                setName(data.name);
                setType(data.type);
                setCategory(data.category);
                setContent(data.content);
            })
        }
    }, []);

    const history = useHistory();
    const editorRef = useRef(null);
    const log = () => {
        //save these variable, all of them are string
        //in useEffect and view page we need getEquipmentById to set the name, type and description placeholder
        const saveName = name;
        const saveType = type;
        const saveCategory = category;
        const saveDescription = editorRef.current.getContent();

        if (id!==null){
            Uploader.submitEquipmentData(saveName,saveDescription,saveCategory,saveType).then((response) => {
                console.log(response);
                if(response === "Equipment Saved Successfully"){
                    //pop out a window with a redirection button
                    history.push("/home");
                }
                setErrorMessage(response.data);
            });
        }else{
            Uploader.updateEquipmentData(id,saveName,saveDescription,saveCategory,saveType).then((response) => {
                console.log(response);
                if(response === "Equipment Updated Successfully"){
                    //pop out a window with a redirection button
                    history.push("/home");
                }
                setErrorMessage(response.data);
            });
        }
        

        /*const tmp = document.createElement("DIV");
        tmp.innerHTML = editorRef.current.getContent().slice();
        const tabs = tmp.getElementsByClassName('tab');
        let content = [];
        const tabNum = tabs.length;
        const parse = require('html-react-parser');
        for (let i = 0; i < tabNum; i++) {
            console.log(i);
            const tabHeader = tabs[0].getElementsByClassName('tabHeader');
            let headerTag = [];
            headerTag.push(<Accordion.Header>{parse(tabHeader[1].innerHTML)}</Accordion.Header>);
            tabs[0].removeChild(tabHeader[0]);
            tabs[0].removeChild(tabHeader[0]);
            tabs[0].removeChild(tabHeader[0]);
            let bodyTag = [];
            bodyTag.push(<Accordion.Body>{parse(tabs[0].innerHTML)}</Accordion.Body>);
            content.push(<Accordion.Item eventKey={i}>{headerTag}{bodyTag}</Accordion.Item>);
            tmp.removeChild(tabs[0]);
        }
        content.push(
            <Accordion.Item eventKey={tabNum}>
                <Accordion.Header>Additional Description</Accordion.Header>
                <Accordion.Body>{parse(tmp.innerHTML)}</Accordion.Body>
            </Accordion.Item>);
        console.log(tmp.innerHTML);
        setContent(content);*/

        /*setContent(editorRef.current.getContent());*/
        //save this to database
        /*editorRef.current.getContent();*/
        /*$("#dataContainer").html(content);*/
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
                        <Form.Control type="text" placeholder={name}/>
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Equipment Category:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}} onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option key="Select Category" value="Select Category" label="Select Category"/>
                            {categories.map((mappingCat) => (
                                <option
                                    key={mappingCat}
                                    value={mappingCat}
                                    label={mappingCat}
                                />
                            ))}
                        </select>
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Equipment Type:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}} onChange={(e) => setType(e.target.value)} value={type}>
                            <option key="Select Type" value="Select Type" label="Select Type"/>
                            {types.map((mappingType) => (
                                <option
                                    key={mappingType}
                                    value={mappingType}
                                    label={mappingType}
                                />
                            ))}
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
                initialValue={content}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor help',
                        'searchreplace visualblocks code insertdatetime media table paste wordcount noneditable'
                    ],

                    toolbar:
                        'undo redo | formatselect | bold italic | alignleft aligncenter alignright | ' +
                        'bullist numlist outdent indent | table | link image media fileUploader | ' +
                        'insertNewTab | preview | print | help',

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

                            reader.onload = function (e) {
                                return Uploader.uploadFiles(file).then((responese)=>{
                                    console.log(responese);
                                    callback(responese.location);
                                });
                            };
                            reader.readAsDataURL(this.files[0]);
                        };

                        input.click();
                    },

                    noneditable_noneditable_class: "tabHeader",

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
                                                type: 'textarea',
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
                                        editor.insertContent('<div class="tab" style="background-color: #d1d1d1"><h3 class="tabHeader">Tab Title:</h3><h2 class="tabHeader">' + data.tabTitle + '</h2><h3 class="tabHeader">Content:</h3><p>' + data.tabContent + '</p></div><p></p>');
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

            <p>{errorMessage}</p>
        </Container>
    );
}

export default EditEquipment;