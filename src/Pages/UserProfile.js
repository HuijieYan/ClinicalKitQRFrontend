import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {getUserName, getName, getLevel, getTrustId, getHospitalId, getPassword} from "../Functions/UserStatus";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {logout} from "../Functions/LoginFunctions";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";
import DeleteData from "../Functions/DeleteData";
import MessageModal from "../Component/MessageModal";

//User Profile is used for edit the user group information and trust information, only used by admins

const UserProfile = () => {
    const [showGroupEditor, setShowGroupEditor] = useState(false);
    const [showGroupDeletion, setShowGroupDeletion] = useState(false);
    const [showTrustEditor, setShowTrustEditor] = useState(false);
    const [showDeleteTrust, setShowDeleteTrust] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
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
    const history = useHistory();

    useEffect(()=>{
        //getUserGroup by trustId and hospitalId and username and get trustName by Trust Id
        
        GetData.getGroup(getHospitalId(),getUserName()).then((group)=>{
            const hospital = group.hospitalId;
            setCurrentData({
                trust: hospital.trust.trustName,
                hospital: hospital.hospitalName,
                username: getUserName(),
                name: getName(),
                email: group.email,
                specialty: group.specialty,
            });
            setUpdateData({
                name: getName(),
                password: getPassword(),
                email: group.email,
                specialty: group.specialty,
            });
        });
        
    },[]);

    function updateUsergroup(){
        Uploader.updateUsergroup(getHospitalId(),getUserName(),updateData.name,updateData.password,updateData.email,updateData.specialty).then((response)=>{
            if(response === ""){
                setShowGroupEditor(false);
                setCurrentData(prevState => ({
                    ...prevState,
                    name: updateData.name,
                    password: updateData.password,
                    email: updateData.email,
                    specialty: updateData.specialty,
                }));
            }else{
                setShowMessage(true);
                setMessage(response.data);
            }
        });
    }

    function deleteUsergroup(){
        DeleteData.deleteUsergroup(getHospitalId(), getUserName()).then((response)=>{
            if (response === ""){
                logout();
                history.push("/login");
            }else{
                setShowMessage(true);
                setMessage(response.data);
            }
        });
    }

    function addTrust(){
        //post newTrustData
        Uploader.addNewTrust(newTrustData.trustName,getHospitalId(),getUserName(),newTrustData.name,newTrustData.password,newTrustData.email,newTrustData.specialty).then((response)=>{
            if(response === ""){
                setShowGroupEditor(false);
            }else{
                setShowMessage(true);
                setMessage(response.data);
            }
        });
    }

    function deleteTrust(){
        //delete trust by id
        DeleteData.deleteTrust(getTrustId()).then((response)=>{
            if (response === ""){
                logout();
                history.push("/login");
            }else{
                setShowMessage(true);
                setMessage(response.data);
            }
        });
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
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

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
                    <Button onClick={() => {
                        updateUsergroup();
                        setShowGroupEditor(false)
                    }}>Submit</Button>
                    <Button onClick={() => setShowGroupEditor(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showGroupDeletion}
                onHide={() => setShowGroupDeletion(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Your Group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Your Group: {currentData.name} will be closed permanently</h4>
                    Once you delete your Group, your Group can not be retrieved.
                    Be careful, if you are the only Trust Admin, once you delete your Group, your Trust will be deleted.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {deleteUsergroup();setShowGroupDeletion(false)}}>Delete</Button>
                    <Button onClick={() => setShowGroupDeletion(false)}>Cancel</Button>
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
                    <Button onClick={() => {
                        addTrust();
                        setShowTrustEditor(false)
                    }}>Submit</Button>
                    <Button onClick={() => setShowTrustEditor(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showDeleteTrust}
                onHide={() => setShowDeleteTrust(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Your Trust
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Your Trust: {currentData.trust} will be closed permanently</h4>
                    Once you delete your Trust, your Trust can not be retrieved.
                    Be careful, delete your Trust means all data in this trust will be lost.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {deleteTrust();setShowDeleteTrust(false)}}>Delete</Button>
                    <Button onClick={() => setShowDeleteTrust(false)}>Cancel</Button>
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
                    {parseInt(getLevel()) >= 2 &&
                    <>
                        <Col xl={3} style={{textAlign: "center"}}>
                            <Button onClick={() => setShowGroupEditor(true)}>Edit</Button>
                        </Col>
                        <Col xl={3} style={{textAlign: "center"}}>
                            <Button onClick={() => setShowGroupDeletion(true)}>Delete Group</Button>
                        </Col>
                    </>
                    }

                    {parseInt(getLevel()) === 3 &&
                    <>
                        <Col xl={2} style={{textAlign: "center"}}>
                            <Button onClick={() => setShowTrustEditor(true)}>Add New Trust</Button>
                        </Col>
                        <Col xl={2} style={{textAlign: "center"}}>
                            <Button onClick={() => setShowDeleteTrust(true)}>Delete Trust</Button>
                        </Col>
                    </>
                    }
                </Row>
            </Form>
        </Container>
    );
}

export default UserProfile;