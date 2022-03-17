import axios from "axios";
import { getHospitalId, getUserName } from "./UserStatus";

//responsible for posting data to update an exist entity or create a new one

const URL = process.env.REACT_APP_BACKEND_URL;

class Uploader {
  uploadFiles(files) {
    const file = files[0];
    const url = URL + "file/upload";
    const data = new FormData();
    data.append("file", file);
    data.append("username", getUserName());
    data.append("hospitalId", getHospitalId());
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  submitEquipmentData(name, content, category, type,manufacturer,model) {
    const data = new FormData();
    const url = URL + "equipment/save";
    data.append("name", name);
    data.append("content", content);
    data.append("category", category);
    data.append("type", type);
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("model",model);
    data.append("manufacturer",manufacturer);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  updateEquipmentData(id, name, content, category, type,manufacturer,model) {
    const data = new FormData();
    const url = URL + "equipment/update";
    data.append("equipmentId", id);
    data.append("name", name);
    data.append("content", content);
    data.append("category", category);
    data.append("type", type);
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("model",model);
    data.append("manufacturer",manufacturer);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  sendSharings(
    senderHospitalId,
    senderUsername,
    equipmentIds,
    receivers,
    title,
    description,
    time
  ) {
    const url = URL + "mail/sending";
    const data = new FormData();
    data.append("senderHospitalId", senderHospitalId);
    data.append("senderUsername", senderUsername);
    data.append("receivers", receivers);
    data.append("title", title);
    data.append("description", description);
    data.append("equipmentIds", equipmentIds);
    data.append("time", time);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  saveEquipments(ids) {
    const url = URL + "sentEquipment/saving";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("ids", ids);
    axios.post(url, data);
  }

  submitIssue(issue, equipmentId) {
    const url = URL + "issues/new";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("description", issue);
    data.append("equipmentId", equipmentId);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  updateUsergroup(id, username, name, password, email, specialty,isAdmin) {
    const url = URL + "usergroup/update";
    const data = new FormData();
    data.append("hospitalId", id);
    data.append("username", username);
    data.append("name", name);
    data.append("password", password);
    data.append("email", email);
    data.append("specialty", specialty);
    data.append("isAdmin",isAdmin);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  addUserGroup(id, username, name, password, email, specialty,isAdmin) {
    const url = URL + "usergroup/register";
    const data = new FormData();
    data.append("hospitalId", id);
    data.append("username", username);
    data.append("name", name);
    data.append("password", password);
    data.append("email", email);
    data.append("specialty", specialty);
    data.append("isAdmin",isAdmin);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  addNewTrust(trustName, id, username, name, password, email, specialty) {
    const url = URL + "usergroup/addTrust";
    const data = new FormData();
    data.append("trustName", trustName);
    data.append("hospitalId", id);
    data.append("username", username);
    data.append("name", name);
    data.append("password", password);
    data.append("email", email);
    data.append("specialty", specialty);
    return axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  addNewHospital(trustId, name) {
    const url = URL + "hospitals/new";
    const data = new FormData();
    data.append("id", trustId);
    data.append("name", name);
    axios.post(url, data);
  }

  updateHospital(hospitalId, name) {
    const url = URL + "hospitals/update";
    const data = new FormData();
    data.append("id", hospitalId);
    data.append("name", name);
    axios.post(url, data);
  }

  addNewQuestion(question, answer) {
    const url = URL + "question/new";
    const data = new FormData();
    data.append("question", question);
    data.append("answer", answer);
    axios.post(url, data);
  }

  updateQuestion(id, question, answer) {
    const url = URL + "question/update";
    const data = new FormData();
    data.append("id", id);
    data.append("question", question);
    data.append("answer", answer);
    axios.post(url, data);
  }
}

export default new Uploader();
