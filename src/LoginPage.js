import { useHistory } from "react-router";
import './LoginPage.css';
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const LoginPage = () => {
    const history = useHistory();
    const hospitalID = 1;
    const loginpageURL = "http://localhost:8080/login";
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [result,setResult] = useState(false);

    const login = (history) =>{
        if(result === false){
            history.push("/loginFail");
        }else{
            history.push("/home");
        } 
    }

    useEffect(()=>{
        var url = loginpageURL + "/hospitalID=" + hospitalID + " username=" + username + " password=" + password;
        axios.get(url).then((response)=>{
            const result = response.data;
            setResult(result);
        });
    })

    return ( 
        <div className = "inputField">
            <h1>Website</h1>
            <Form>
                <Form.Group id="username">
                    <Form.Label>Departmental Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter Departmental Username" value={username} onChange={(e)=>setUsername(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Department Password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Button id="loginButton" type="submit" onClick={()=>login(history)}>Log in</Button>
        </div>
     );
}
 
export default LoginPage;