import defaultProfile from "../Picture/defaultProfile.png";
import './MenuBar.css';
import { Container, Form, FormControl, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MenuBar = () => {
    const [searchStr,setSearchStr] = useState("");
    const history = useHistory();

    const search = () =>{
        if(searchStr === ""){
            return;
        }

        history.push("/result/name="+searchStr+"/category=None/type=None");
    }

    return (
        <Navbar collapseOnSelect expand="lg" lg bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/home">NHS Icon</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>

                        <Nav.Link href="/equipmentTable">Equipments</Nav.Link>

                        <Nav.Link href="/search">Search</Nav.Link>

                        <NavDropdown title="Operations">
                            <NavDropdown.Item href="/search">Search</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reports">Produce Report</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Tables">
                            <NavDropdown.Item href="/equipmentTable">Equipments</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/hospitalTable">Hospitals</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/usergroupTable">User Groups</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/issueTable">Reported Issues</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/contactBook">Contact Book</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="/inbox">Share Inbox</Nav.Link>

                        <Nav.Link href="/faq">FAQs</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search Equipment"
                            className="me-2"
                            aria-label="Search"
                            value={searchStr}
                            onChange={(e)=>{setSearchStr(e.target.value)}}
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