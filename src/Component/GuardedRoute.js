import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { checkLogIn } from "../Functions/LoginFunctions";
import { getLevel, setRedirection } from "../Functions/UserStatus";

const GuardedRoute = ({path, component,render,requireLevel}) => {
    const location = useLocation();
    const level = parseInt(getLevel());

    if (checkLogIn()){
        if(level<requireLevel){
            return(<Redirect to="/home"/>);
        }
        if (component === null){
            return(<Route exact path={path} render={render}/>);
        }else{
            return(<Route exact path={path}>{component}</Route>);
        }
        
    }else{
        setRedirection(location.pathname);
        return (<Redirect to="/login"/>);
    }
}
 
export default GuardedRoute;