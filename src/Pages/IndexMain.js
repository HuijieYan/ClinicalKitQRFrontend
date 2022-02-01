import ButtonList from "../Component/ButtonList";
import {FaQuestion} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css';
import { getExpireTime, getHospitalId, getLevel, getUserName } from "../Component/UserStatus";
import { Button } from "react-bootstrap";
import { logout } from "../Functions/LoginFunctions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const IndexMain = () => {
    const history = useHistory();
    const handleLogout = ()=>{
        logout();
        history.push("/login");
    }

    return (
        <div className = "indexMain" id = "mainContent">
            {console.log(getUserName())}
            {console.log(getHospitalId())}
            {console.log(getLevel())}
            {console.log(getExpireTime())}
            
            <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <div>
                            <h1><span className="text-warning"> Welcome </span></h1>
                            <p className="lead my-4">
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                This is description!This is description!This is description!<br></br>
                                The background is waiting a picture!!!!<br></br>
                            </p>
                        </div>
                        <img
                            className="img-fluid w-50 d-none d-sm-block"
                            src="./defaultProfile.png"
                            alt=""
                        />
                    </div>
                </div>
            </section>
            <div className="float-end" id = "faqButton">
                <a href="/"><FaQuestion size="20px"/></a>
            </div>
            <ButtonList/>

            <Button onClick={(e)=>{handleLogout()}}>Log Out</Button>
        </div>
     );
}
 
export default IndexMain;