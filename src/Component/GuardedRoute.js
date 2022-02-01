import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { checkLogIn } from "../Functions/LoginFunctions";

const GaurdedRoute = ({path, component,render}) => {
    const checked = checkLogIn();

    if (checked){
        return(<Route exact path={path} render={render}>{component}</Route>);
    }else{
        return (<Redirect to="/login"/>);
    }
}
 
export default GaurdedRoute;