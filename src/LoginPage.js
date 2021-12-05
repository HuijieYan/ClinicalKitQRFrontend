import { useHistory } from "react-router";
import './LoginPage.css';

const LoginPage = () => {
    const history = useHistory();
    const login = (history) =>{
        history.push("/home");
    }
    return ( 
        <div>
            <h2>Website Name</h2>
            <div className = "inputField">
                <p>Departmental Username</p>
                <input 
                type = "text"
                placeholder = "Enter Departmental Username"
                name = "username"
                />
            </div>
            <div className = "inputField">
                <p>Password</p>
                <input 
                type = "text"
                placeholder = "Enter Password"
                name = "password"
                />
            </div>
            <button id = "loginButton" type="submit" onClick={()=>login(history)}>Log in</button>
        </div>
     );
}
 
export default LoginPage;