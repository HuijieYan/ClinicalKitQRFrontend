import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";

const EditUsergroup = ({ groupUsername, selectedHospitalId }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrustHospital, setIsTrustHospital] = useState(false);
  const [trustHospitalId, setTrustHospitalId] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL + "usergroup/register/";
  const [errorMessage, setErrorMessage] = useState("");

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
      setIsAdmin(false);
      setHospitalId(selectedHospitalId);
    }
  }, []);

  //renders only once for fetching selection options

  async function submit() {
    if (groupUsername === undefined) {
    } else {
      //we do update here, need a new url and a backend post mapping
      Uploader.updateUsergroup(
        hospitalId,
        groupUsername,
        name,
        password,
        email,
        specialty
      );
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
      {hospitals.length > 1 && (
        <Form>
          <Form.Label>Hostpital</Form.Label>
          <select
            defaultValue={hospitalId}
            disabled={groupUsername !== undefined}
            onChange={(e) => detectTrustHospital(e)}
          >
            <option key={-1} value={-1} label="Select a Trust" />
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
          <Form.Label>Departmental Username</Form.Label>
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
          <Form.Label>Group Name</Form.Label>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            defaultValue={password}
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
      <Button id="submitButton" type="submit" onClick={() => submit()}>
        Submit
      </Button>
      <span>{errorMessage}</span>
    </div>
  );
};

export default EditUsergroup;
