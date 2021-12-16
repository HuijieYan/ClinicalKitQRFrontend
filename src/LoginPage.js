import { useHistory } from "react-router";
import './LoginPage.css';
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
    const history = useHistory();
    const loginFail = false;
    const login = (history) =>{
        if(loginFail){
            history.push("/loginFail");
        }else{
            history.push("/home");
        } 
    }

    return ( 
        <div className = "inputField">
            <h1>Website</h1>
            <Form>
                <Form.Group id="username">
                    <Form.Label>Departmental Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter Departmental Username"></Form.Control>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Department Password"></Form.Control>
                </Form.Group>
            </Form>
            <Button id="loginButton" type="submit" onClick={()=>login(history)}>Log in</Button>
        </div>
     );
}
 
export default LoginPage;