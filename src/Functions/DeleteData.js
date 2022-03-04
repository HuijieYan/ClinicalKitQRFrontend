import axios from "axios";
import { getHospitalId, getUserName } from "./UserStatus";

//responsible for post delete data

const URL = process.env.REACT_APP_BACKEND_URL;

class DeleteData {
  deleteEquipment(id) {
    axios.delete(URL + "equipment/delete/id=" + id);
  }

  deleteIssue(id) {
    axios.delete(URL + "issues/delete/issueId=" + id);
  }

  deleteUsergroup(hospitalId, username) {
    axios.delete(
      URL +
        "usergroup/delete/hospitalId=" +
        hospitalId +
        " username=" +
        username
    );
  }

  deleteMail(id) {
    const url = URL + "mail/delete";
    const data = new FormData();
    data.append("id", id);
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    axios.post(url, data);
  }

  async deleteHospital(id) {
    const url = URL + "hospitals/delete";
    const data = new FormData();
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }

  async deleteTrust(id) {
    const url = URL + "trusts/delete";
    const data = new FormData();
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }

  async deleteQuestion(id) {
    const url = URL + "question/delete";
    const data = new FormData();
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }
}

export default new DeleteData();
