import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { checkLogIn } from "../Functions/LoginFunctions";
import { getLevel, setRedirection } from "../Functions/UserStatus";

/**
 * GuardedRoute is responsible for authentication, if the user has login and higher or equal to require level,
 * user will be redirect to the page, level 1 is normal user, level 2 is hospital admin, level 3 is trust admin
 * @class GuardedRoute
 * @memberof module:Router
 * @param {string} path -the url user is accessing
 * @param {object} component -existing pets
 * @param {function} render -render is responsible for mapping value contain in the url
 * @param {number} requireLevel -the user level required to access the page
 * @constructor
 */

const GuardedRoute = ({path, component, render, requireLevel}) => {
    const location = useLocation();
    /**
     * user level from user status
     * @type {number}
     */
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