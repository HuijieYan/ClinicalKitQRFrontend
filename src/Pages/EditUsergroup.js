import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";
import MessageModal from "../Component/MessageModal";
import { useHistory } from "react-router-dom";
import Select from "react-select";

const EditUsergroup = ({ groupUsername, selectedHospitalId }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalId, setHospitalId] = useState("-1");
  const [hospitals, setHospitals] = useState([]);
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [trustHospitalId, setTrustHospitalId] = useState("");

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const level = parseInt(getLevel());
    if (level === 3) {
      GetData.getAllHospitalsByTrust(getTrustId()).then((data) => initializeHospitals(data));
      setTrustHospitalId(getHospitalId());
    } else if (level === 2) {
      GetData.getHospitalById(getHospitalId()).then((data) => initializeHospitals([data.data]));
    }


    if (groupUsername !== undefined) {
      setUsername(groupUsername);
      //get usergroup information by username and hospitalId and trustId
      //so we could get the placeholder while editing
      setHospitalId(selectedHospitalId);

      GetData.getGroup(selectedHospitalId, groupUsername).then((data) => {
        setIsAdmin(data.isAdmin);
        setName(data.name);
        setEmail(data.email);
        setSpecialty(data.specialty);
      });
    }
  }, []);

  function initializeHospitals(hospitals){
      let hospitalList = [{ value: "-1", label: "Select Hospital" }]
      hospitals.map((hospital) => {
          hospitalList.push({ value: hospital.hospitalId.toString(), label: hospital.hospitalName })
      })
      setHospitals(hospitalList);
  }

  //renders only once for fetching selection options

  async function submit() {
    if (groupUsername === undefined) {
        //add new usergroup
        if(username==="" || parseInt(hospitalId)===-1 || name==="" || password===""){
          setMessage("Required fields are empty");
          setShowMessage(true);
          return;
        }

        Uploader.addUserGroup(
          hospitalId,
          username,
          name,
          password,
          email,
          specialty,
          isAdmin
        ).then((response) => {
            if(response === ""){
              history.push("/usergroupTable");
            }else{
              setShowMessage(true);
              setMessage(response);
            }
        });
    } else {
      //we do update here, need a new url and a backend post mapping
      if(name===""){
        setMessage("Required fields are empty");
        setShowMessage(true);
        return;
      }

      Uploader.updateUsergroup(
        hospitalId,
        groupUsername,
        name,
        password,
        email,
        specialty
      ).then((response) => {
          if(response === ""){
              history.push("/usergroupTable");
          }else{
              setShowMessage(true);
              setMessage(response);
          }
      });
    }
  }

  function detectTrustHospital(e) {
    if (e.value === trustHospitalId) {
        setIsAdmin(true);
    }
    setHospitalId(e.value);
  }

  return (
      <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey"}}>
          <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

          <Form style={{textAlign: 'left'}}>
              {hospitals.length > 1 && (
                  <Row style={{marginTop: '3%'}}>
                      <Col xl={3}>
                          <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Hospital:</Form.Label>
                      </Col>
                      <Col xl={3}>
                          <Select
                              isDisabled={groupUsername !== undefined}
                              value={hospitals.filter(option => option.value === hospitalId)}
                              options={hospitals}
                              onChange={(e) => detectTrustHospital(e)}
                              menuPortalTarget={document.body}/>
                      </Col>
                  </Row>
              )}

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Departmental Username*:</Form.Label>
                  </Col>
                  <Col xl={3}>
                          <Form.Control
                              type="groupUsername"
                              placeholder="Enter Departmental Username"
                              defaultValue={username}
                              disabled={groupUsername !== undefined}
                              onChange={(e) => setUsername(e.target.value)}
                          />
                  </Col>
              </Row>

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Group Name*:</Form.Label>
                  </Col>
                  <Col xl={3}>
                      <Form.Control
                          type="groupName"
                          placeholder="Enter Usergroup's name"
                          defaultValue={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </Col>
              </Row>

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>
                          {groupUsername===undefined?"Password*":"New Password (Optional)"}:
                      </Form.Label>
                  </Col>
                  <Col xl={3}>
                      <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </Col>
              </Row>

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Email Address (optional):</Form.Label>
                  </Col>
                  <Col xl={3}>
                      <Form.Control
                          type="email"
                          placeholder="Enter Email Address"
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </Col>
              </Row>

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Speciality (optional):</Form.Label>
                  </Col>
                  <Col xl={3}>
                      <Form.Control
                          type="specialty"
                          placeholder="Enter specialty"
                          defaultValue={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                      />
                  </Col>
              </Row>

              <Row style={{marginTop: '3%'}}>
                  <Col xl={3}>
                      <Form.Label style={{color: 'gray', fontSize: 'x-large'}}>Is Administrator:</Form.Label>
                  </Col>
                  <Col xl={3}>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={isAdmin}
                                  onChange={(e) => setIsAdmin(e.target.checked)}
                              />
                          }
                          disabled={hospitalId === trustHospitalId}
                          label="Administrator/User"
                      />
                  </Col>
              </Row>
          </Form>

          <Container style={{marginTop: "3%", marginBottom: "1%"}}>
              <Button style={{marginRight: '2%'}} onClick={() => history.push("/usergroupTable")}>Back</Button>
              <Button onClick={() => submit()}>Submit</Button>
          </Container>
      </Container>
  );
};

export default EditUsergroup;
