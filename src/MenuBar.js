import Sidebar from "./Sidebar";
import {FaSearch} from "react-icons/fa";
import defaultProfile from "./defaultProfile.png";

const MenuBar = () => {
//Please align them horizontally
    return ( 
        <div className = "menuBar">
            <Sidebar pageWrapId={'content'} outerContainerId={'app'} />
            <div className = "searchField">
                <input 
                type = "text"
                placeholder = "Find Equipment"
                name = "search"
                />
                <button type="submit"><FaSearch/></button>
            </div>
            <div className="profilePic">
                <img src = {defaultProfile} alt="profileImg"/>
            </div>
        </div>
     );
}
 
export default MenuBar;