import Sidebar from "./Sidebar";
import {FaSearch} from "react-icons/fa";
import defaultProfile from "./defaultProfile.png";
//import './MenuBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";

const MenuBar = () => {
    return ( 
        <div className = "menuBar">
            <Sidebar pageWrapId={'content'} outerContainerId={'app'}/>
            <Container className = "bar">
            <Row>
                <Col>
                    <input 
                    id = "searchBar"
                    type = "text"
                    placeholder = "Find Equipment"
                    name = "search"
                    />
                    <button type="submit"><FaSearch/></button>
                </Col>
                <Col><img id = "profilePic" src = {defaultProfile} alt="profileImg" height={100} width={100}/></Col>
            </Row>
            </Container>
        </div>
     );
}
 
export default MenuBar;