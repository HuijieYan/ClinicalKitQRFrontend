import ButtonList from "../Component/ButtonList";
import { Container, Row } from "react-bootstrap";
import LogOut from "../Component/LogOut";

/**
 * Web Home page, contains the available operation cards and logout button
 * @module IndexMain
 */
const IndexMain = () => {
    return (
        <div className="indexMain" id="mainContent">

            <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center ">
                <Container style={{paddingBottom: '3%'}}>
                    <h1>Welcome to Clinical kit QR System</h1>
                </Container>
            </section>

            <Row className="mb-3 justify-content-center">
                <ButtonList />
            </Row>

            <LogOut/>
        </div>
    );
};

export default IndexMain;
