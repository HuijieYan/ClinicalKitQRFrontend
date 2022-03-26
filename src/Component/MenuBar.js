import userProfile from "../Picture/userProfile.png";
import './MenuBar.css';
import { Container, Form, FormControl, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useState } from 'react';
import { getLevel } from "../Functions/UserStatus";
import { useHistory } from "react-router-dom";

/**
 * MenuBar is on the top of all web pages, it contains all web page's shortcut url
 * @class MenuBar
 * @memberof module:Router
 */
const MenuBar = () => {
    const [searchStr,setSearchStr] = useState("");
    const history = useHistory();
    const level = parseInt(getLevel());

    function search(){
        if(searchStr === ""){
            return;
        }
        history.push("/result/name="+searchStr+"/category=all/type=all/manufacturer=all/model=all");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/home" style={{fontSize: 'xx-large'}}>NHS Neonatal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>

                        {level>=2 && <Nav.Link href="/equipmentTable">Equipments</Nav.Link>}

                        <Nav.Link href="/search">Search</Nav.Link>

                        {level>=2 && 
                        <NavDropdown title="Operations">
                            <NavDropdown.Item href="/search">Search</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/reports">Produce Report</NavDropdown.Item>
                        </NavDropdown>
                        }

                        {level>=2 &&
                        <NavDropdown title="Tables">
                            <NavDropdown.Item href="/equipmentTable">Equipments</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {level===3&&<NavDropdown.Item href="/hospitalTable">Hospitals</NavDropdown.Item>}
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/usergroupTable">User Groups</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/issueTable">Reported Issues</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="/contactBook">Contact Book</NavDropdown.Item>
                        </NavDropdown>
                        }

                        {level>=2 && <Nav.Link href="/inbox">Share Inbox</Nav.Link>}

                        <Nav.Link href="/faq">FAQs</Nav.Link>
                    </Nav>

                    <Container style={{maxWidth: '350px'}}>
                        <Form className="d-flex" onSubmit={search}>
                            <FormControl
                                type="search"
                                placeholder="Search Equipment"
                                className="me-2"
                                value={searchStr}
                                onChange={(e) => {setSearchStr(e.target.value)}}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Container>

                    <img
                        id = "profilePic"
                        src = {userProfile}
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