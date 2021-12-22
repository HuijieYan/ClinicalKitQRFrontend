/*import Sidebar from "./Sidebar";
import {FaSearch} from "react-icons/fa";*/
import './MenuBar.css';
import defaultProfile from "../Picture/defaultProfile.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormControl, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";

const MenuBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">NHS neonatal Information System Icon</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Link</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <img id = "profilePic" src = {defaultProfile} alt="profileImg" height={80} width={80}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default MenuBar;