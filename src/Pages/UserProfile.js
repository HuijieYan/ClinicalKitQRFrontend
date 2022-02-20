import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {getUserName, getName, getPassword, getLevel, getTrustId, getHospitalId} from "../Functions/UserStatus";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {logout} from "../Functions/LoginFunctions";
import GetData from "../Functions/GetData";

const UserProfile = () => {
    const [showGroupEditor, setShowGroupEditor] = useState(false);
    const [showTrustEditor, setShowTrustEditor] = useState(false);
    const [currentData,setCurrentData] = useState({
        trust: "",
        hospital: "",
        username: "",
        name: "",
        email: "",
        specialty: "",
    });
    const [updateData, setUpdateData] = useState({
        name: "",
        password: "",
        email: "",
        specialty: "",
    });
    const [newTrustData, setNewTrustData] = useState({
        trustName: "",
        username: "",
        name: "",
        password: "",
        email: "",
        specialty: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    useEffect(()=>{
        //getUserGroup by trustId and hospitalId and username and get trustName by Trust Id
        
        GetData.getGroup(getHospitalId(),getUserName()).then((group)=>{
            var user = {};
            user["username"] = getUserName();
            user["name"] = getName();
            var hospital = group.hospitalId;
            user["hospital"] = hospital.hospitalName;
            user["trust"] = hospital.trust.trustName;
            user["email"] = group.email;
            user["specialty"] = group.specialty;
            console.log(user);
            setCurrentData(user);
        });
        
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
        console.log(newTrustData);
        if(!succeed){
            setErrorMessage("response message");
        }
    }

    function handleUpdate(e){
        const { name, value } = e.target;
        setUpdateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleAddTrust(e){
        const { name, value } = e.target;
        setNewTrustData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                        onChange={handleUpdate}
                        name="name"
                    />

                    <h4>Enter Password:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Password Here:"
                        defaultValue={currentData.password}
                        onChange={handleUpdate}
                        name="password"
                    />

                    <h4>Email (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Email Here:"
                        defaultValue={currentData.email}
                        onChange={handleUpdate}
                        name="email"
                    />

                    <h4>Specialty (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Specialty Here:"
                        defaultValue={currentData.specialty}
                        onChange={handleUpdate}
                        name="specialty"
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
                        onChange={handleAddTrust}
                        name="trustName"
                    />

                    <h4>Trust Admin username:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin username Here:"
                        onChange={handleAddTrust}
                        name="username"
                    />

                    <h4>Trust Admin Group name:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Group name Here:"
                        onChange={handleAddTrust}
                        name="name"
                    />

                    <h4>Trust Admin Password:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Password Here:"
                        onChange={handleAddTrust}
                        name="password"
                    />

                    <h4>Trust Admin Email (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Email Here:"
                        onChange={handleAddTrust}
                        name="email"
                    />

                    <h4>Trust Admin Specialty (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Trust Admin Specialty Here:"
                        onChange={handleAddTrust}
                        name="specialty"
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