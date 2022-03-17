import ButtonList from "../Component/ButtonList";
import { Container, Row, Col } from "react-bootstrap";
import LogOut from "../Component/LogOut";

const IndexMain = () => {
  return (
    <div className="indexMain" id="mainContent">

      <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center ">
        <Container>
          <Col className="mb-3">
          <h1>Welcome</h1>
          </Col>
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
