import Sidebar from "./Sidebar";
import {FaSearch} from "react-icons/fa";
import defaultProfile from "./defaultProfile.png";
import './MenuBar.css';

const MenuBar = () => {
//Please align them horizontally
    return ( 
        <div className = "menuBar">
            <Sidebar pageWrapId={'content'} outerContainerId={'app'}/>
            <div className = "searchBar">
            <input 
            id = "searchBar"
            type = "text"
            placeholder = "Find Equipment"
            name = "search"
            />
            <button type="submit"><FaSearch/></button>
            </div>
            <div> <img id = "profilePic" src = {defaultProfile} alt="profileImg"/> </div>
        </div>
     );
}
 
export default MenuBar;