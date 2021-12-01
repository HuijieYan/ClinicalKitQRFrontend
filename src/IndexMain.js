import ButtonList from "./ButtonList";
import {FaQuestion} from "react-icons/fa";

const indexMain = () => {
    const welcomeMessage = "Welcome";

    return (
        <div className = "indexMain" id = "mainContent">
            <div className = "message">
                <h1>{welcomeMessage}</h1>
            </div>
            <ButtonList/>
            <div className = "faqButton">
                <a href="#"><FaQuestion/></a>
            </div>
        </div>
     );
}
 
export default indexMain;