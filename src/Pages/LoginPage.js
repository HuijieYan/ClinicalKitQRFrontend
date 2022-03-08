import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import {
  Button,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  setLevel,
  setTrustID,
  setHospitalID,
  setUserName,
  setName,
  setPassword,
  setExpireTime,
} from "../Functions/UserStatus";
import Auxiliary from "../Functions/Auxiliary";
import GetData from "../Functions/GetData";

//Login page get trust and group from backend and save the user data in local host

const LoginPage = () => {
  const history = useHistory();
  const [trusts, setFormTrusts] = useState([]);
  const [trustId, setFormTrustID] = useState("-1");
  const [hospitalId, setFormHospitalID] = useState("-1");
  const [hospitals, setFormHospitals] = useState([]);
  const [username, setFormUserName] = useState("");
  const [password, setFormPassword] = useState("");
  const [failMessage, setMessage] = useState("");

  useEffect(() => {
    GetData.getAllTrusts().then((data) => {
      setFormTrusts(data);
    });
    //set trusts' selection option
    GetData.getAllHospitalsByTrust(trustId).then((data) => {
      setFormHospitals(data);
    });
  }, [trustId]);
  //renders only once for fetching selection options

  async function login(e) {
    e.preventDefault();
    if (
      trustId === "-1" ||
      hospitalId === "-1" ||
      Auxiliary.isEmpty(username) ||
      Auxiliary.isEmpty(password)
    ) {
      return;
    }

    GetData.login(hospitalId, username, password).then((resultArray) => {
      if (resultArray.length > 0) {
        const expireTime = new Date().setUTCHours(new Date().getUTCHours() + 3);
        //3 hours session
        setLevel(resultArray[0]);
        setHospitalID(resultArray[1]);
        setTrustID(resultArray[2]);
        setUserName(username);
        setName(resultArray[3]);
        setExpireTime(expireTime.valueOf());
        setPassword(password);
        history.push("/home");
      } else {
        setMessage("Wrong Username or Password");
        setFormUserName("");
        setFormPassword("");
      }
    });
  }

  return (
    <div className="contents p-5">
      <Container fluid="md">
        <Row className="mb-3 justify-content-center">
          <Col md="8">
            <div className="d-grid">
              <h1>Log In to Clinical QR Kit</h1>
              <Form onSubmit={(e) => login(e)}>
                <FloatingLabel controlId="floatingSelect" label="Trust">
                  <Form.Select
                    className="mt-3 mb-3"
                    aria-label="Select Trust"
                    value={trustId}
                    onChange={(e) => setFormTrustID(e.target.value)}
                  >
                    <option value="-1" disabled>
                      Select Trust
                    </option>
                    {trusts.map((trust) => (
                      <option
                        key={trust.trustId}
                        value={trust.trustId}
                        label={trust.trustName}
                      />
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingSelectHospital"
                  label="Hospital"
                >
                  <Form.Select
                    className="mt-3 mb-3"
                    aria-label="Select Hospital"
                    value={hospitalId}
                    onChange={(e) => setFormHospitalID(e.target.value)}
                  >
                    <option value="-1" disabled>
                      Select Hospital
                    </option>
                    {hospitals.map((hospital) => (
                      <option
                        key={hospital.hospitalId}
                        value={hospital.hospitalId}
                        label={hospital.hospitalName}
                      />
                    ))}
                  </Form.Select>
                </FloatingLabel>

                <Form.Group as={Col} id="username" className="mt-3 mb-3">
                  <FloatingLabel controlId="floatingUsername" label="Username">
                    <Form.Control
                      type="username"
                      placeholder="Enter Departmental Username"
                      value={username}
                      onChange={(e) => setFormUserName(e.target.value)}
                      onInput={() => setMessage("")}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} id="password" className="mt-3 mb-3">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Department Password"
                      value={password}
                      onChange={(e) => setFormPassword(e.target.value)}
                      onInput={() => setMessage("")}
                    />
                  </FloatingLabel>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button className="mt-3 mb-3" id="loginButton" type="submit">
                    Log in
                  </Button>
                </div>
                <Form.Label>{failMessage}</Form.Label>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
