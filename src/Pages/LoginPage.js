import { useHistory } from "react-router";
import './LoginPage.css';
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const history = useHistory();
    const hospitalID = 1;
    const loginPageURL = "http://localhost:8080/login";
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [result,setResult] = useState(false);
    const [failMessage,setMessage] = useState("");

    const login = () =>{
        if (result) {
            history.push("/home");
        } else {
            setMessage("fail!!");
            setPassword("");
        }
    }

    useEffect(()=>{
        const url = loginPageURL + "/hospitalID=" + hospitalID + " username=" + username + " password=" + password;
        axios.get(url).then((response)=>{
            setResult(response.data);
        });
    })

    return (
        <div className = "inputField">
            <h1>Website</h1>
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
