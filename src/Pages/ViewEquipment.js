import {Button, Container, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import GetData from "../Functions/GetData";
import EquipmentViewRender from "../Component/EquipmentViewRender";
import Uploader from "../Functions/Uploader";

//This is equipment display page for user, and it contains the corresponding report modal

const ViewEquipment = (props) => {
    const {id} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [issue, setIssue] = useState("");


    useEffect(() => {
        if(id !== null){
            GetData.getEquipmentById(id).then((data)=>{
                setName(data.name);
                setType(data.type);
                setCategory(data.category);
                setDescription(data.content);
            });
        }

    }, []);

    function submitIssue() {
        if(issue.length===0){
            return;
        }
        Uploader.submitIssue(issue,id);
    }

    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", paddingTop: '1%', borderColor: "grey", textAlign: 'left', fontSize: 'x-large'}}>
            <Button variant="primary" style={{float: 'right'}} onClick={() => setModalShow(true)}>Report Issue</Button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Issue Description</h4>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Enter the description here."
                            onChange={(e) => setIssue(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {submitIssue(); setModalShow(false)}}>Submit</Button>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <EquipmentViewRender name={name} type={type} category={category} description={description}/>
        </Container>
    );
}

export default ViewEquipment;