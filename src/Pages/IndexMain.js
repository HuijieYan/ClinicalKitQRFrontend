import ButtonList from "../Component/ButtonList";
import { Button, Container, Row, Col } from "react-bootstrap";
import { logout } from "../Functions/LoginFunctions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const IndexMain = () => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

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

      <Button
        onClick={() => {
          handleLogout();
        }}
      >Log Out</Button>

      <img
        className="images"
        src={
          process.env.REACT_APP_BACKEND_URL +
          "file/download/bb5fa948-db14-4543-a8aa-fc4198d81747.png"
        }
        alt={""}
      />
    </div>
  );
};

export default IndexMain;
