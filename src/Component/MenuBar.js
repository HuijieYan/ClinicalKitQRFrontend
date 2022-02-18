import defaultProfile from "../Picture/defaultProfile.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormControl, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MenuBar = () => {
    const [str,setStr] = useState("");
    const history = useHistory();

    const search = () =>{
        if(str === ""){
            return;
        }
        //console.log("/result?name="+name+" category="+selectedCategory+" type="+selectedType);
        history.push("/result/name="+str+"/category=None/type=None");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">NHS neonatal Information System Icon</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/equipmentTable">Equipments</Nav.Link>
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
                            value={str}
                            onChange={(e)=>{setStr(e.target.value)}}
                        />
                        <Button variant="outline-success" onClick={search}>Search</Button>
                    </Form>
                    <img
                        id = "profilePic"
                        src = {defaultProfile}
                        alt="profileImg"
                        onClick={() => history.push("/user")}
                        height={70}
                        width={70}
                        style={{marginLeft: '5%'}}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default MenuBar;