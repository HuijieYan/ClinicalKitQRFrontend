import {Form, Container, Row, Col, Modal, Accordion, Card, useAccordionButton} from "react-bootstrap";
import {useEffect, useState} from "react";
import Uploader from "../Functions/Uploader";
import "bootstrap/dist/css/bootstrap.min.css";
import GetData from "../Functions/GetData";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import MessageModal from "../Component/MessageModal";
import EquipmentEditor from "../Component/EquipmentEditor";
import {Button} from "@mui/material";
import EquipmentViewRender from "../Component/EquipmentViewRender";

//This page is used for adding new equipment or edit exit equipment

const EditEquipment = ({id}) => {
    const [name, setName] = useState("");

    //the clinical system of an equipment
    const [type,setType] = useState("");
    const [types,setTypes] = useState([]);

    //the patient demographic of an equipment
    const [category,setCategory] = useState("");
    const [categories,setCategories] = useState([]);

    //the manufacturer of the equipment
    const [manufacturer,setManufacturer] = useState("");
    const [manufacturers,setManufacturers] = useState([]);
    const [model,setModel] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [tabNames, setTabNames] = useState( ["Announcement"]);
    const [tabContents, setTabContents] = useState( ["<p>Enter announcement here.</p>"]);

    const [showPreview, setShowPreview] = useState(false);

    const [showAddTab, setShowAddTab] = useState(false);
    const [tabName, setTabName] = useState("");
    const [currentTab, setCurrentTab] = useState("");

    useEffect(() => {
        GetData.getTypes().then((types) => {
            let typeOptions = [{ value: "", label: "Select Clinical System" }]
            types.map((type) => {
                typeOptions.push({ value: type, label: type })
            })
            setTypes(typeOptions)
        });

        GetData.getCategories().then((categories)=>{
            let categoryOptions = [{ value: "", label: "Select Patient Demographic" }]
            categories.map((category) => {
                categoryOptions.push({ value: category, label: category })
            })
            setCategories(categoryOptions);
        });

        GetData.getAllManufacturers().then((manufacturers)=>{
            let manufacturerOptions = [{ value: "", label: "Select Manufacturer" }]
            manufacturers.map((manufacturer) => {
                manufacturerOptions.push({ value: manufacturer, label: manufacturer })
            })
            setManufacturers(manufacturerOptions);
        });

        if(id != null){
            GetData.getEquipmentById(id).then((data) => {
                setName(data.name);
                setType(data.type);
                setCategory(data.category);

                const tabs = JSON.parse(data.content);
                setTabNames(Object.keys(tabs));
                setTabContents(Object.values(tabs));

                setModel(data.model.modelName);
                setManufacturer(data.model.manufacturer.manufacturerName);
            })
        }
    }, []);

    const history = useHistory();
    function save(){
        if(category === ""){
            setShowMessage(true);
            setMessage("Error: Patient demographic not selected");
            return;
        }else if(type === ""){
            setShowMessage(true);
            setMessage("Error: Clinical system not selected");
            return;
        }else if(manufacturer === ""){
            setShowMessage(true);
            setMessage("Error: Manufacturer not selected");
            return;
        }else if(name === ""){
            setShowMessage(true);
            setMessage("Error: Equipment Name not selected");
            return;
        }

        const saveName = name;
        const saveType = type;
        const saveCategory = category;
        const saveDescription = JSON.stringify(descriptionToJSON());
        const saveManufacturer = manufacturer;
        const saveModel = model;

        if (id == null){
            Uploader.submitEquipmentData(saveName,saveDescription,saveCategory,saveType,saveManufacturer,saveModel).then((response) => {
                if(response === "Equipment Saved Successfully"){
                    history.push("/equipmentTable");
                }else{
                    setShowMessage(true);
                    setMessage(response.data);
                }
            });
        }else{
            Uploader.updateEquipmentData(id,saveName,saveDescription,saveCategory,saveType,saveManufacturer,saveModel).then((response) => {
                if(response === "Equipment Updated Successfully"){
                    history.push("/equipmentTable");
                }else{
                    setShowMessage(true);
                    setMessage(response.data);
                }
            });
        }
    }

    function descriptionToJSON(){
        let saveDescription = {};
        tabNames.map((key, index) => saveDescription[key] = tabContents[index]);
        return saveDescription;
    }

    function createManufacturer(e){
        if(e.__isNew__ === true){
            setManufacturers([...manufacturers, { value: e.value, label: e.value }])
        }
        setManufacturer(e.value)
    }


    function CustomAccordionBar({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <>
                <Form.Label style={{float: 'left'}}>{children}</Form.Label>
                <Form.Group style={{textAlign: 'right'}}>
                    <Button onClick={() => {setShowAddTab(true); setCurrentTab(children)}}>Rename</Button>
                    <Button onClick={() => deleteTab(children)}>Delete</Button>
                    <Button onClick={decoratedOnClick} >Open</Button>
                </Form.Group>
            </>
        );
    }

    function resetTabModal(){
        setShowAddTab(false);
        setTabName("");
        setCurrentTab("");
    }

    function deleteTab(tabName){
        const index = tabNames.indexOf(tabName);
        tabNames.splice(index, 1);
        setTabNames([...tabNames])
        tabContents.splice(index, 1);
    }

    function addTab(){
        if(tabName === ""){
            setShowMessage(true);
            setMessage("Error: tab name can not be empty");
        }else{
            if(tabNames.indexOf(tabName) !== -1){
                setShowMessage(true);
                setMessage("Error: tab name already exist");
            }else {
                if(currentTab === ""){
                    setTabNames([...tabNames, tabName]);
                    setTabContents([...tabContents, ""]);

                }else {
                    const index = tabNames.indexOf(currentTab);
                    tabNames[index] = tabName;
                }
            }
        }
        resetTabModal();
    }

    function PreviewWindow() {
        const saveDescription = descriptionToJSON();

        return (
            <Modal
                show={showPreview}
                onHide={() => setShowPreview(false)}
                size="lg"
                scrollable={true}
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <EquipmentViewRender
                        name={name}
                        type={type}
                        category={category}
                        manufacturer={manufacturer}
                        model={model}
                        description={saveDescription}
                    />
                </Modal.Body>
            </Modal>
        );
    }

    return (
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey"}}>
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

            <PreviewWindow/>

            <Form style={{marginTop: '3%', marginBottom: '3%'}}>
                <Row style={{textAlign: 'left'}}>
                    <Col xl={3} style={{color: 'gray', fontSize: 'x-large'}}>
                        <Form.Group>
                            <Form.Label>Equipment Name*:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={3}>
                        <Form.Control
                            type="text"
                            placeholder="Enter Equipment Name here"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', marginTop: '3%'}}>
                    <Col xl={3} style={{fontSize: 'x-large'}}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Manufacturer*:</Form.Label>
                    </Col>
                    <Col xl={3}>
                        <CreatableSelect
                            value={manufacturers.filter(option => option.value === manufacturer)}
                            onChange={createManufacturer}
                            options={manufacturers}
                            menuPortalTarget={document.body}
                        />
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', marginTop: '3%'}}>
                    <Col xl={3} style={{fontSize: 'x-large'}}>
                        <Form.Group style={{textAlign: 'left', fontSize: 'x-large'}}>
                            <Form.Label style={{color: 'gray', textAlign: 'left', fontSize: 'x-large'}}>Equipment Model Name:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={3}>
                        <Form.Control
                            type="text"
                            placeholder="Enter Equipment Model Name here"
                            defaultValue={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', marginTop: '3%'}}>
                    <Col xl={3} style={{fontSize: 'x-large'}}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Patient Demographic*:</Form.Label>
                    </Col>
                    <Col xl={3}>
                        <Select value={categories.filter(option => option.value === category)}
                                options={categories}
                                onChange={(e) => setCategory(e.value)}
                                menuPortalTarget={document.body}/>
                    </Col>
                </Row>

                <Row  style={{textAlign: 'left', marginTop: '3%'}}>
                    <Col xl={3} style={{fontSize: 'x-large'}}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Clinical System*:</Form.Label>
                    </Col>
                    <Col xl={3}>
                        <Select value={types.filter(option => option.value === type)}
                                options={types}
                                onChange={(e) => setType(e.value)}
                                menuPortalTarget={document.body}/>
                    </Col>
                </Row>
            </Form>


            <Row  style={{textAlign: 'left', fontSize: 'x-large'}}>
                <Form.Group style={{textAlign: 'right'}}>
                    <Form.Label style={{color: 'gray', float: 'left'}}>Page Data:</Form.Label>
                    <Button variant="contained" onClick={() => setShowPreview(true)}>Preview</Button>
                    <Button style={{marginLeft: '2%'}} variant="contained" onClick={() => setShowAddTab(true)}>Add Tab</Button>
                </Form.Group>
            </Row>

            <Modal
                show={showAddTab}
                onHide={resetTabModal}
                size="lg"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Tab Name:</Form.Label>
                        <Form.Control
                            placeholder="Enter the description here."
                            onChange={(e) => setTabName(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addTab}>Submit</Button>
                    <Button onClick={resetTabModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Accordion alwaysOpen>
            {tabNames.map((key, index) => (
                <Card>
                    <Card.Header>
                        <CustomAccordionBar eventKey={index}>{key}</CustomAccordionBar>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            <EquipmentEditor index={index} content={tabContents[index]} tabContents={tabContents}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
            </Accordion>

            <Button style={{marginTop: "3%", marginBottom: "1%"}} variant="contained" onClick={save}>Save</Button>
        </Container>
    );
}

export default EditEquipment;