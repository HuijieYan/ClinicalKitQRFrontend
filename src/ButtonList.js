import "./ButtonList.css";

const ButtonList = () => {
    return ( 
        <ul className = "buttonList">
            <li>
                <a href="#">Equipment</a>
            </li>
            <li>
                <a href="#">User Groups</a>
            </li>
            <li>
                <a href="#">Reported Issues</a>
            </li>
            <li>
                <a href="#">Produce Report</a>
            </li>  
        </ul>
     );
}
 
export default ButtonList;