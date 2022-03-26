import {Button} from "react-bootstrap";
import {logout} from "../Functions/LoginFunctions";
import {useHistory} from "react-router-dom";

/**
 * Logout Button call logout function in Functions
 * @class LogOut
 * @memberof module:IndexMain
 */
const LogOut = () => {
    const history = useHistory();
    function handleLogout(){
        logout();
        history.push("/login");
    }

    return(
        <Button onClick={handleLogout} style={{marginBottom: '2%'}}>Log Out</Button>
    );
}

export default LogOut;