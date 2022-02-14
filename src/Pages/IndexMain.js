import ButtonList from "../Component/ButtonList";
import { FaQuestion } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import {
  getExpireTime,
  getHospitalId,
  getLevel,
  getUserName,
} from "../Functions/UserStatus";
import { Button, Row } from "react-bootstrap";
import { logout } from "../Functions/LoginFunctions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import HomePageActionCards from "../Component/HomePageActionCards";

const IndexMain = () => {
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div className="indexMain" id="mainContent">
      {console.log(getUserName())}
      {console.log(getHospitalId())}
      {console.log(getLevel())}
      {console.log(getExpireTime())}

      <section className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
        <div className="container">
          <div className="d-sm-flex align-items-center justify-content-between">
            <div>
              <h1>
                <span className="text-warning"> Welcome </span>
              </h1>
              <p className="lead my-4">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </p>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src="./defaultProfile.png"
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="float-end" id="faqButton">
        <a href="/">
          <FaQuestion size="20px" />
        </a>
      </div>
      <Row className="mb-3 justify-content-center">
        {/* <HomePageActionCards /> */}
        <ButtonList />
      </Row>

      <Button
        onClick={(e) => {
          handleLogout();
        }}
      >
        Log Out
      </Button>

      <img
        className="images"
        src={
          "http://localhost:8080/file/download/bb5fa948-db14-4543-a8aa-fc4198d81747.png"
        }
        alt={""}
      />
    </div>
  );
};

export default IndexMain;
