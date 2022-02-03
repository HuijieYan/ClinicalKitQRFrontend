import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { checkLogIn } from "../Functions/LoginFunctions";

const GuardedRoute = ({path, component,render}) => {

    if (checkLogIn()){
        if (component === null){
            return(<Route exact path={path} render={render}>{console.log("In route")}</Route>);
        }else{
            return(<Route exact path={path}>{console.log("In route")}{component}</Route>);
        }
        
    }else{
        return (<Redirect to="/login"/>);
    }
}
 
export default GuardedRoute;