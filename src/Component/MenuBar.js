import defaultProfile from "../Picture/defaultProfile.png";
import './MenuBar.css';
import { Container, Form, FormControl, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from 'react';
import { getLevel } from "../Functions/UserStatus";
import { useHistory } from "react-router-dom";

const MenuBar = () => {
    const [searchStr,setSearchStr] = useState("");
    const history = useHistory();
    const level = parseInt(getLevel());

    function search(){
        if(searchStr === ""){
            return;
        }
        history.push("/result/name="+searchStr+"/category=None/type=None");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#/home">NHS Icon</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="#/home">Home</Nav.Link>

                        {level>=2 && <Nav.Link href="#/equipmentTable">Equipments</Nav.Link>}

                        <Nav.Link href="#/search">Search</Nav.Link>

                        {level>=2 && 
                        <NavDropdown title="Operations">
                            <NavDropdown.Item href="#/search">Search</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#/reports">Produce Report</NavDropdown.Item>
                        </NavDropdown>
                        }

                        {level>=2 &&
                        <NavDropdown title="Tables">
                            <NavDropdown.Item href="#/equipmentTable">Equipments</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {level===3&&<NavDropdown.Item href="#/hospitalTable">Hospitals</NavDropdown.Item>}
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#/usergroupTable">User Groups</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#/issueTable">Reported Issues</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#/contactBook">Contact Book</NavDropdown.Item>
                        </NavDropdown>
                        }

                        {level>=2 && <Nav.Link href="#/inbox">Share Inbox</Nav.Link>}

                        <Nav.Link href="#/faq">FAQs</Nav.Link>
                    </Nav>

                    <Container style={{maxWidth: '350px'}}>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search Equipment"
                                className="me-2"
                                onChange={(e) => {setSearchStr(e.target.value)}}
                            />
                            <Button variant="outline-success" onClick={search}>Search</Button>
                        </Form>
                    </Container>

                    <img
                        id = "profilePic"
                        src = {defaultProfile}
                        alt="profileImg"
                        onClick={() => history.push("/user")}
                        height={70}
                        width={70}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
     );
}
 
export default MenuBar;