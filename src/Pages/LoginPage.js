import { useHistory } from "react-router-dom";
import './LoginPage.css';
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useEffect, useState } from "react";
import UserStatus from "../Component/UserStatus";
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
                UserStatus.setLevel(resultArray[0]);
                UserStatus.setHospitalID(resultArray[1]);
                UserStatus.setTrustID(resultArray[2]);
            } else {
                setMessage("fail!!");
                setPassword("");
            }
        });
    }

    return (
        <div className = "inputField">
            <h1>Website</h1>
            <Form>
                <Form.Label>Trust</Form.Label>
                <select value={trustId} onChange={(e)=>setTrustId(e.target.value)}>
                    <option value="-1" label="Select Trust"/>
                    {trusts.map(trust=>(
                        <option key={trust.trustId} value={trust.trustId} label={trust.trustName}/>
                    ))}
                </select>
            </Form>
            <Form>
                <Form.Label>Hostpital</Form.Label>
                <select value={hospitalId} onChange={(e)=>setHospitalId(e.target.value)}>
                    <option value="-1" label="Select Hospital"/>
                    {hospitals.map(hospital=>(
                        <option key={hospital.hospitalId} value={hospital.hospitalId} label={hospital.hospitalName}/>
                    ))}
                </select>
            </Form>
            <Form>
                <Form.Group id="username">
                    <Form.Label>Departmental Username</Form.Label>
                    <Form.Control type="username"
                                  placeholder="Enter Departmental Username"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Department Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
            </Form>
            <Button id="loginButton" type="submit" onClick={()=>login()}>Log in</Button>
            <Form>
                <Form.Label>{failMessage}</Form.Label>
            </Form>
        </div>
    );
}

export default LoginPage;
