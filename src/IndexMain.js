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
            <div className = "faqIcon">
                <FaQuestion/>
            </div>
        </div>
     );
}
 
export default indexMain;