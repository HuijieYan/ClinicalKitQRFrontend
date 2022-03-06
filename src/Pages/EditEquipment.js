import {Form, Container, Button, Row, Col, Modal} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';
import React, {useEffect, useRef, useState} from "react";
import Uploader from "../Functions/Uploader";
import "bootstrap/dist/css/bootstrap.min.css";
import GetData from "../Functions/GetData";
import {useHistory} from "react-router-dom";
import EquipmentViewRender from "../Component/EquipmentViewRender";

//This page is used for adding new equipment or edit exit equipment

const EditEquipment = ({id}) => {
    const [content,setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [type,setType] = useState("");
    //the clinical system of an equipment
    const [types,setTypes] = useState([]);
    const [category,setCategory] = useState("");
    //the patient demographic of an equipment
    const [categories,setCategories] = useState([]);
    const [manufacturer,setManufacturer] = useState("");
    //the manufacturer of the equipment
    const [manufacturers,setManufacturers] = useState([]);
    const [model,setModel] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const editorRef = useRef(null);

    function PreviewWindow() {
        return (
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                scrollable={true}
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <EquipmentViewRender name={name} type={type} category={category} description={content}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function image_upload_handler (blobInfo, success, failure, progress) {
        return Uploader.uploadFiles([blobInfo.blob()]).then((responese)=>{
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

        GetData.getAllManufacturers().then((manufacturers)=>{
            setManufacturers(manufacturers);
        });

        console.log(id);
        if(id != null){
            GetData.getEquipmentById(id).then((data) => {
                console.log(data.name);
                setName(data.name);
                setType(data.type);
                setCategory(data.category);
                setContent(data.content);
                setModel(data.model.modelName);
                setManufacturer(data.model.manufacturer.manufacturerName);
            })
        }
    }, [id]);

    const history = useHistory();
    const log = () => {
        if(category === ""){
            setErrorMessage("Error: Patient demographic not selected");
            return;
        }
        if(type === ""){
            setErrorMessage("Error: Clinical system not selected");
            return;
        }
        const saveName = name;
        const saveType = type;
        const saveCategory = category;
        const saveDescription = editorRef.current.getContent();
        const saveManufacturer = manufacturer;
        const saveModel = model;

        if (id == null){
            Uploader.submitEquipmentData(saveName,saveDescription,saveCategory,saveType,saveManufacturer,saveModel).then((response) => {
                if(response === "Equipment Saved Successfully"){
                    history.push("/home");
                }
                setErrorMessage(response.data);
            });
        }else{
            Uploader.updateEquipmentData(id,saveName,saveDescription,saveCategory,saveType,saveManufacturer,saveModel).then((response) => {
                if(response === "Equipment Updated Successfully"){
                    history.push("/home");
                }
                setErrorMessage(response.data);
            });
        }
    };

    return (
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey"}}>
            <PreviewWindow />
            <Form style={{marginTop: '3%', marginBottom: '3%'}}>
                <Row>
                    <Col xl={3}>
                        <Form.Group style={{textAlign: 'left', fontSize: 'x-large'}}>
                            <Form.Label style={{color: 'gray', textAlign: 'left', fontSize: 'x-large'}}>Equipment Name:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Control
                            type="text"
                            placeholder="Enter Equipment Name here"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={3}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Manufacturer:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}} onChange={(e) => setManufacturer(e.target.value)} value={manufacturer}>
                            <option key="Select Manufacturer" value="" label="Select Manufacturer"/>
                            {manufacturers.map((manufacturer) => (
                                <option
                                    key={manufacturer}
                                    value={manufacturer}
                                    label={manufacturer}
                                />
                            ))}
                        </select>
                    </Col>
                </Row>

                <Row>
                    <Col xl={3}>
                        <Form.Group style={{textAlign: 'left', fontSize: 'x-large'}}>
                            <Form.Label style={{color: 'gray', textAlign: 'left', fontSize: 'x-large'}}>Equipment Model Name:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Control
                            type="text"
                            placeholder="Enter Equipment Model Name here"
                            defaultValue={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Col xl={3}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Patient Demographic:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}} onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option key="Select Patient Demographic" value="" label="Select Patient Demographic"/>
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
                    <Col xl={3}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Clinical System:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <select style={{fontSize: 'x-large'}} onChange={(e) => setType(e.target.value)} value={type}>
                            <option key="Select Clinical System" value="" label="Select Clinical System"/>
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
                    <Form.Label style={{color: 'gray'}}>Page Data:</Form.Label>
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
                        'advlist autolink lists link image charmap print anchor help',
                        'searchreplace insertdatetime media table paste wordcount noneditable'
                    ],

                    toolbar:
                        'undo redo | formatselect | bold italic | alignleft aligncenter alignright | ' +
                        'bullist numlist outdent indent | table | link image media fileUploader | ' +
                        'insertNewTab | previewButton | print | help',

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
                                        //This is a nonEditable Tab
                                        editor.insertContent('<div class="tab" style="background-color: #484848"><h3 class="tabHeader">Tab Title:</h3><h2 class="tabHeader">' + data.tabTitle + '</h2><h3 class="tabHeader">Content:</h3><p>' + data.tabContent + '</p></div><p></p>');
                                        api.close();
                                    },
                                });
                            },
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
                                            text: 'Upload',
                                            type: 'submit',
                                            primary: true,
                                            enabled: false
                                        }
                                    ],

                                    onSubmit: function (api) {
                                        const data = api.getData();
                                        editor.insertContent('<p><img src="https://i.ibb.co/8rfqJw1/icons8-file-16.png" alt="file"/><a href="'+ data.fileUploader.value +'">file</a></p>');
                                        api.close();
                                    },
                                });
                            },
                        });

                        editor.ui.registry.addButton('previewButton', {
                            icon: 'preview',
                            tooltip: 'Preview Equipment Page',
                            onAction: () => {setContent(editor.getContent()); setModalShow(true)},
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