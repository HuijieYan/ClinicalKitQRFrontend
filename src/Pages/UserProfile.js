import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {getUserName, getName, getLevel, getTrustId, getHospitalId, getPassword} from "../Functions/UserStatus";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {logout} from "../Functions/LoginFunctions";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";
import DeleteData from "../Functions/DeleteData";
import MessageModal from "../Component/MessageModal";
import LogOut from "../Component/LogOut";

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
        password: "",
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
    const level = parseInt(getLevel());

    useEffect(()=>{
        //getUserGroup by trustId and hospitalId and username and get trustName by Trust Id
        
        GetData.getGroup(getHospitalId(),getUserName()).then((group)=>{
            const hospital = group.hospitalId;
            setCurrentData({
                trust: hospital.trust.trustName,
                hospital: hospital.hospitalName,
                username: getUserName(),
                name: getName(),
                password: getPassword(),
                email: group.email,
                specialty: group.specialty,
            });
            setUpdateData({
                name: getName(),
                password: "",
                email: group.email,
                specialty: group.specialty,
            });
        });
        
    },[]);

    function updateUsergroup(){
        const newName = updateData.name;
        const newPassword = updateData.password === "" ? currentData.password : updateData.password;
        const newEmail = updateData.email;
        const newSpecialty = updateData.specialty;

        setShowMessage(true);
        if(newName === ""){
            resetUsergroup();
            setMessage("Error: group name can not be empty!");
        }else {
            Uploader.updateUsergroup(getHospitalId(),getUserName(), newName, newPassword, newEmail, newSpecialty).then((response)=>{
                if(response === ""){
                    setShowGroupEditor(false);
                    setCurrentData(prevState => ({
                        ...prevState,
                        name: newName,
                        password: newPassword,
                        email: newEmail,
                        specialty: newSpecialty,
                    }));
                    setMessage("User Group updated!");
                }else{
                    resetUsergroup();
                    setMessage(response.data);
                }
            });
        }
    }

    function resetUsergroup(){
        setShowGroupEditor(false);
        setUpdateData({
            name: currentData.name,
            password: "",
            email: currentData.email,
            specialty: currentData.specialty,
        })
    }

    function deleteUsergroup(){
        DeleteData.deleteUsergroup(getHospitalId(), getUserName()).then((response)=>{
            logout();
            history.push("/login");
        });
    }

    function addTrust(){
        const newTrustName = newTrustData.trustName;
        const newTrustUsername = newTrustData.username;
        const newTrustGroupName = newTrustData.name;
        const newTrustPassword = newTrustData.password;
        const newTrustEmail = newTrustData.email;
        const newTrustSpecialty = newTrustData.specialty;

        setShowMessage(true);
        if(newTrustName === "" || newTrustUsername === "" || newTrustGroupName === "" || newTrustPassword === ""){
            setMessage("Error: Please fill in all the required sections.");
        }else {
            //post newTrustData
            Uploader.addNewTrust(newTrustName,getHospitalId(),newTrustUsername,newTrustGroupName,newTrustPassword,newTrustEmail,newTrustSpecialty).then((response)=>{
                if(response === ""){
                    setMessage("New Trust added!");
                }else {
                    setMessage(response.data);
                }
            });
        }

        resetNewTrust();
    }

    function resetNewTrust(){
        setShowTrustEditor(false);
        setNewTrustData({
            trustName: "",
            username: "",
            name: "",
            password: "",
            email: "",
            specialty: "",
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

    function handleUpdateUsergroup(e){
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
                onHide={resetUsergroup}
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
                        onChange={handleUpdateUsergroup}
                        name="name"
                    />

                    <h4>Enter Password (Use old password if empty):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Password Here:"
                        onChange={handleUpdateUsergroup}
                        name="password"
                    />

                    <h4>Email (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Email Here:"
                        defaultValue={currentData.email}
                        onChange={handleUpdateUsergroup}
                        name="email"
                    />

                    <h4>Specialty (Optional):</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Specialty Here:"
                        defaultValue={currentData.specialty}
                        onChange={handleUpdateUsergroup}
                        name="specialty"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={resetUsergroup}>Close</Button>
                    <Button onClick={updateUsergroup}>Submit</Button>
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
                    Be careful, if you are the only Trust Admin, once you delete your Group, your Trust will not be able to add a new trust admin.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowGroupDeletion(false)}>Cancel</Button>
                    <Button onClick={() => {deleteUsergroup();setShowGroupDeletion(false)}}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showTrustEditor}
                onHide={resetNewTrust}
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
                    <Button onClick={resetNewTrust}>Close</Button>
                    <Button onClick={addTrust}>Submit</Button>
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
                    <Button onClick={() => setShowDeleteTrust(false)}>Cancel</Button>
                    <Button onClick={() => {deleteTrust();setShowDeleteTrust(false)}}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <Container style={{marginTop: '3%', marginBottom: '3%', textAlign: 'left', fontSize: 'x-large'}}>
                <Row>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Trust:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.trust}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Hospital:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.hospital}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Username:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.username}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Group Name:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.name}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Email:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.email}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col xl={2}>
                        <Form.Label style={{color: 'gray'}}>Specialty:</Form.Label>
                    </Col>
                    <Col xl={2}>
                        <Form.Label>{currentData.specialty}</Form.Label>
                    </Col>
                </Row>

                <Row  style={{marginTop: '3%'}}>
                    <Col style={{textAlign: "right"}}>
                        {level >= 2 &&
                            <Button onClick={() => setShowGroupEditor(true)}>Edit</Button>
                        }
                    </Col>

                    <Col style={{textAlign: "left"}}>
                        {level >= 2 &&
                            <Button onClick={() => setShowGroupDeletion(true)}>Delete Group</Button>
                        }
                    </Col>

                    <Col style={{textAlign: 'center'}}>
                        <LogOut/>
                    </Col>

                    <Col style={{textAlign: "right"}}>
                        {level === 3 &&
                            <Button onClick={() => setShowTrustEditor(true)}>Add New Trust</Button>
                        }
                    </Col>

                    <Col style={{textAlign: "left"}}>
                        {level === 3 &&
                            <Button onClick={() => setShowDeleteTrust(true)}>Delete Trust</Button>
                        }
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default UserProfile;