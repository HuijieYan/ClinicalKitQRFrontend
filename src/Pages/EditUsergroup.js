import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";
import MessageModal from "../Component/MessageModal";
import { useHistory } from "react-router-dom";

const EditUsergroup = ({ groupUsername, selectedHospitalId }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalId, setHospitalId] = useState(-1);
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
      GetData.getAllHospitalsByTrust(getTrustId()).then((data) =>
        setHospitals(data)
      );
      setTrustHospitalId(getHospitalId());
    } else if (level === 2) {
      GetData.getHospitalById(getHospitalId()).then((data) => {
        setHospitals([data.data]);
      });
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

  //renders only once for fetching selection options

  async function submit() {
    if (groupUsername === undefined) {
        //add new usergroup
        if(username===""||parseInt(hospitalId)===-1||name===""||password===""){
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
    if (e.target.value === trustHospitalId) {
      setIsAdmin(true);
    }
    setHospitalId(e.target.value);
  }

  return (
    <div>
      <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

      {hospitals.length > 1 && (
        <Form>
          <Form.Label>Hostpital</Form.Label>
          <select
            defaultValue={hospitalId}
            disabled={groupUsername !== undefined}
            onChange={(e) => detectTrustHospital(e)}
          >
            <option key={-1} value={-1} label="Select a Hospital" />
            {hospitals.map((hospital) => (
              <option
                key={hospital.hospitalId}
                value={hospital.hospitalId}
                label={hospital.hospitalName}
              />
            ))}
          </select>
        </Form>
      )}

      <Form>
        <Form.Group id="username">
          <Form.Label>Departmental Username*</Form.Label>
          <Form.Control
            type="groupUsername"
            placeholder="Enter Departmental Username"
            defaultValue={username}
            disabled={groupUsername !== undefined}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group id="groupName">
          <Form.Label>Group Name*</Form.Label>
          <Form.Control
            type="groupName"
            placeholder="Enter Usergroup's name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group id="password">
          <Form.Label>{groupUsername===undefined?"Password*":"New Password (Optional)"}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group id="email">
          <Form.Label>Email Address (optional)</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group id="specialty">
          <Form.Label>Speciality (optional)</Form.Label>
          <Form.Control
            type="specialty"
            placeholder="Enter specialty"
            defaultValue={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </Form.Group>
      </Form>

      <FormControlLabel
        control={
          <Checkbox
            checked={isAdmin}
            onChange={(e) => {
              setIsAdmin(e.target.checked);
            }}
          />
        }
        disabled={hospitalId === trustHospitalId}
        label="Is Administrator"
      />
      <Button id="submitButton" type="submit" onClick={() => history.push("/usergroupTable")}>
        Back
      </Button>
      <Button id="submitButton" type="submit" onClick={() => submit()}>
        Submit
      </Button>
    </div>
  );
};

export default EditUsergroup;
