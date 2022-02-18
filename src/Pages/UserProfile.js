import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {getUserName, getName, getPassword, getLevel, getTrustId, getHospitalId} from "../Functions/UserStatus";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {logout} from "../Functions/LoginFunctions";
import GetData from "../Functions/GetData";

const UserProfile = () => {
    const [showGroupEditor, setShowGroupEditor] = useState(false);
    const [showTrustEditor, setShowTrustEditor] = useState(false);
    const [currentData, setCurrentData] = useState({
        trust: "",
        hospital: "",
        username: getUserName(),
        name: getName(),
        password: getPassword(),
        email: "",
        specialty: "",
    });
    const updateData = {
        name: "",
        password: "",
        email: "",
        specialty: "",
    };
    const newTrustData= {
        trustName: "",
        username: "",
        name: "",
        password: "",
        email: "",
        specialty: "",
    };
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    useEffect(()=>{
        //getUserGroup by trustId and hospitalId and username and get trustName by Trust Id
        const hospital = GetData.getHospitalById(getHospitalId()).then((hospital) => hospital.hospitalName);

    },[]);

    function updateUsergroup(){
        //post the trustId username hospitalId
        //and post updateData

        setErrorMessage("response message");
        const succeed = true; // response outcome
        if(succeed){
            logout();
            history.push("/login");
        }
    }

    function addTrust(){
        //post newTrustData
        const succeed = true; // response outcome
        if(!succeed){
            setErrorMessage("response message");
        }
    }

    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey"}}>
            <Modal
                show={showGroupEditor}
                onHide={() => setShowGroupEditor(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {currentData.username}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Group Name:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Group Name Here:"
                        defaultValue={currentData.name}
                        onChange={(e) => updateData.name = e.target.value}
                    />

                    <h4>Enter Password:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Password Here:"
                        defaultValue={currentData.password}
                        onChange={(e) => updateData.password = e.target.value}
                    />

                    <h4>Email (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Email Here:"
                        defaultValue={currentData.email}
                        onChange={(e) => updateData.email = e.target.value}
                    />

                    <h4>Specialty (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Specialty Here:"
                        defaultValue={currentData.specialty}
                        onChange={(e) => updateData.specialty = e.target.value}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {updateUsergroup(); setShowGroupEditor(false)}}>Submit</Button>
                    <Button onClick={() => setShowGroupEditor(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showTrustEditor}
                onHide={() => setShowTrustEditor(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Add New Trust</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Trust Name:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Name Here:"
                        onChange={(e) => newTrustData.trustName = e.target.value}
                    />

                    <h4>Trust Admin username:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin username Here:"
                        onChange={(e) => newTrustData.username = e.target.value}
                    />

                    <h4>Trust Admin Group name:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Group name Here:"
                        onChange={(e) => newTrustData.name = e.target.value}
                    />

                    <h4>Trust Admin Password:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Password Here:"
                        onChange={(e) => newTrustData.password = e.target.value}
                    />

                    <h4>Trust Admin Email (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Email Here:"
                        onChange={(e) => newTrustData.email = e.target.value}
                    />

                    <h4>Trust Admin Specialty (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Specialty Here:"
                        onChange={(e) => newTrustData.specialty = e.target.value}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {addTrust(); setShowTrustEditor(false)}}>Submit</Button>
                    <Button onClick={() => setShowTrustEditor(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Form style={{marginTop: '3%', marginBottom: '3%', textAlign: 'left', fontSize: 'x-large'}}>
                <Row>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label style={{color: 'gray'}}>Trust:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label>{currentData.trust}</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label style={{color: 'gray'}}>Hospital:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label>{currentData.hospital}</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label style={{color: 'gray'}}>Username:</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xl={2}>
                        <Form.Group>
                            <Form.Label>{currentData.username}</Form.Label>
                        </Form.Group>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Group Name:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.name}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Password:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.password}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Email:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.email}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>Specialty:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.specialty}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={3} style={{textAlign: "center"}}>
                        <Button onClick={() => setShowGroupEditor(true)}>Edit</Button>
                    </Col>
                    {parseInt(getLevel()) === 3 &&
                        <Col xl={2} style={{textAlign: "center"}}>
                            <Button onClick={() => setShowTrustEditor(true)}>Add New Trust</Button>
                        </Col>
                    }
                    <Form.Label style={{color: 'red', margin: '2%'}}>{errorMessage}</Form.Label>
                </Row>
            </Form>
        </Container>
    );
}
export default UserProfile;