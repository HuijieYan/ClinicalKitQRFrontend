import { useHistory } from "react-router-dom";
import './LoginPage.css';
import { Button, Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { setLevel, setTrustID,setHospitalID, setUserName, setName } from "../Component/UserStatus";
import Auxiliary from "../Functions/Auxiliary";
import GetData from "../Functions/GetData";

const LoginPage = () => {
    const history = useHistory();
    const loginPageURL = "http://localhost:8080/usergroup/login";
    const [trusts,setTrusts] = useState([]);
    const [trustId,setTrustId] = useState("-1");
    const [hospitalId,setHospitalId] = useState("-1");
    const [hospitals,setHospitals] = useState([]);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [failMessage,setMessage] = useState("");

    useEffect(()=>{
        GetData.getAllTrusts().then((data)=>{setTrusts(data)});
        //set trusts' selection option
        GetData.getAllHospitalsByTrust(trustId).then((data)=>{setHospitals(data)});
    },[trustId]);
    //renders only once for fetching selection options

    async function login(){
        if (trustId === "-1"||hospitalId === "-1" || Auxiliary.isEmpty(username)|| Auxiliary.isEmpty(password)){
            return;
        }
        const url = loginPageURL + "/hospitalID=" + hospitalId + " username=" + username + " password=" + password;
        axios.get(url).then((response)=>{
            var resultArray = response.data;
            if (resultArray.length > 0) {
                history.push("/home");
                setLevel(resultArray[0]);
                setHospitalID(resultArray[1]);
                setTrustID(resultArray[2]);
                setUserName(username);
                setName(resultArray[3]);
            } else {
                setMessage("fail!!");
                setPassword("");
            }
        });
    }

    return (
        <Container fluid="md">
            <Row className="mb-3">
                <h1>Sign In</h1>
            </Row>
            <div className = "inputField">
                <Form>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Trust: </Form.Label>
                            <Form.Select aria-label="Select Trust" value={trustId} onChange={(e)=>setTrustId(e.target.value)}>
                            <option defaultValue="-1" disabled>Select Trust</option>   
                            {trusts.map(trust=>(
                                    <option key={trust.trustId} value={trust.trustId} label={trust.trustName}/>
                                ))}

                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Hospital: </Form.Label>
                            <Form.Select value={hospitalId} onChange={(e)=>setHospitalId(e.target.value)}>
                            <option defaultValue="-1" disabled>Select Hospital</option>  
                                {hospitals.map(hospital=>(
                                    <option key={hospital.hospitalId} value={hospital.hospitalId} label={hospital.hospitalName}/>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} id="username">
                        <FloatingLabel controlId="floatingUsername" label="Department Username">
                        <Form.Control type="username"
                                    placeholder="Enter Departmental Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} id="password">
                        <FloatingLabel controlId="floatingPassword" label="Department Password">
                            <Form.Control type="password"
                                        placeholder="Department Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                    
                <Button id="loginButton" type="submit" onClick={()=>login()}>Log in</Button>
                    <Form.Label>{failMessage}</Form.Label>
                </Form>
            </div>
        </Container>
    );
}

export default LoginPage;
