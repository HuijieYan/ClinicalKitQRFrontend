import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { checkLogIn } from "../Functions/LoginFunctions";
import { getLevel, setRedirection } from "../Functions/UserStatus";

const GuardedRoute = ({path, component,render,requireLevel}) => {
    const level = parseInt(getLevel());

    if (checkLogIn()){
        console.log(level);
        if(level<requireLevel){
            return(<Redirect to="/home"/>);
        }
        if (component === null){
            return(<Route exact path={path} render={render}/>);
        }else{
            return(<Route exact path={path}>{component}</Route>);
        }
        
    }else{
        setRedirection(path);
        return (<Redirect to="/login"/>);
    }
}
 
export default GuardedRoute;