import axios from "axios";
import { getHospitalId, getUserName, getLevel, getTrustId } from "./UserStatus";

//responsible for get data from backend

const URL = process.env.REACT_APP_BACKEND_URL;

class GetData {
  async getAllTrusts() {
    const url = URL + "trusts/all";
    const response = await axios.get(url);
    return response.data;
  }

  async getAllHospitals() {
    const url = URL + "hospitals/all";
    const response = await axios.get(url);
    return response.data;
  }

  async getAllHospitalsByTrust(id) {
    const url = URL + "hospitals/all/trustId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getEquipment() {
    const level = getLevel();
    if (level === 2) {
      const data = await this.getAllEquipmentByHospital(getHospitalId());
      return data;
    } else if (level === 3) {
      const data_1 = await this.getAllEquipmentByTrust(getTrustId());
      return data_1;
    }
  }

  async getAllEquipmentByHospital(id) {
    const url = URL + "equipment/hospitalId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getAllEquipmentByTrust(id) {
    const url = URL + "equipment/trustId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getGroups() {
    const level = getLevel();
    if (level === 2) {
      const data = await this.getAllGroupsByHospital(getHospitalId());
      return data;
    } else if (level === 3) {
      const data_1 = await this.getAllGroupsByTrust(getTrustId());
      return data_1;
    }
  }

  async getAllGroupsByTrust(id) {
    const url = URL + "usergroup/trustId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getAllGroupsByHospital(id) {
    const url = URL + "usergroup/hospitalId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getIssues() {
    const level = getLevel();
    if (level === 2) {
      const data = await this.getAllIssuesByHospital(getHospitalId());
      return data;
    } else if (level === 3) {
      const data_1 = await this.getAllIssuesByTrust(getTrustId());
      return data_1;
    }
  }

  async getAllIssuesByHospital(id) {
    const url = URL + "issues/hospitalId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getAllIssuesByTrust(id) {
    const url = URL + "issues/trustId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  setIssueSolved(id, solved) {
    const url = URL + "issues/issueId=" + id;
    const data = new FormData();
    data.append("solved", solved);
    return axios.post(url, data);
  }

  async getHospitalById(id) {
    const url = URL + "hospitals/hospitalId=" + id;
    const response = await axios.get(url);
    return response.data;
  }

  async getTrustById(id) {
    const url = URL + "trusts/";
    const data = new FormData();
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getGroup(hospitalId, username) {
    const url = URL + "usergroup/get";
    const data = new FormData();
    data.append("hospitalId", hospitalId);
    data.append("username", username);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getAllAdmins() {
    const url = URL + "usergroup/all/admins";
    const response = await axios.get(url);
    return response.data;
  }

  async getAllAdminsInOrder() {
    const url = URL + "trusts/all/admins";
    const response = await axios.get(url);
    return response.data;
  }

  async getReceivedSharings(id, username) {
    const url = URL + "mail/receiver";
    const data = new FormData();
    data.append("hospitalId", id);
    data.append("username", username);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getSentSharings(id, username) {
    const url = URL + "mail/sender";
    const data = new FormData();
    data.append("hospitalId", id);
    data.append("username", username);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getFile(id) {
    const url = URL + "file/download/" + id;
    axios.get(url, {responseType: 'blob'}).then((response) => {
      let url = window.URL.createObjectURL(response.data);
      let link = document.createElement('a');
      link.href = url;
      link.download = id;
      link.click();
      window.close();
    });
  }

  async login(hospitalId, username, password) {
    const url = URL + "usergroup/login";
    const data = new FormData();
    const id = String(hospitalId);
    data.append("hospitalId", id);
    data.append("username", username);
    data.append("password", password);

    return await axios.post(url, data).then((response) => {
      return response.data;
    });
  }

  async getTypes() {
    const url = URL + "equipment/types";
    const response = await axios.get(url);
    return response.data;
  }

  async getCategories() {
    const url = URL + "equipment/categories";
    const response = await axios.get(url);
    return response.data;
  }

  async search(name, category, type,manufacturer,model) {
    const url = URL + "equipment/search";
    const data = new FormData();
    if(name===" "){
      name = "";
    }
    if(category==="all"){
      category = "";
    }
    if(type==="all"){
      type = "";
    }
    if(manufacturer==="all"){
      manufacturer = "";
    }
    if(model==="all"){
      model = "";
    }
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("category", category);
    data.append("type", type);
    data.append("name", name);
    data.append("manufacturer", manufacturer);
    data.append("model", model);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getEquipmentById(id) {
    const url = URL + "equipment/get";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }

  async getSentEquipmentById(id) {
    const url = URL + "sentEquipment/get";
    const data = new FormData();
    data.append("id", id);
    const response = await axios.post(url, data);
    return response.data;
  }
  // Report and Viewing Getters

  async getViewingsByUserGroup(hospitalId, usergroup) {
    const url =
        URL + "reports/hospitalId=" + hospitalId + "&username=" + usergroup;
    const response = await axios.get(url);
    console.log("Got viewings by date", response.data);
    return response.data;
  }

  async getViewingsByEquipmentIdAndDateBetween(id, startDate, endDate) {
    const url =
        URL +
        "reports/equipmentId=" +
        id +
        "/startDate=" +
        (startDate == null ? "" : startDate.toISOString()) +
        "/endDate=" +
        (endDate == null ? "" : endDate.toISOString());
    const response = await axios.get(url);
    return response.data;
  }

  async getAllQuestions() {
    const url = URL + "question/all";
    const response = await axios.get(url);
    return response.data;
  }

  async getAllManufacturers() {
    const url = URL + "equipment/manufacturers/all";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    const response = await axios.post(url,data);
    return response.data;
  }

  async getAllModelsByUser() {
    const url = URL + "equipment/models/getByUser";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    const response = await axios.post(url,data);
    return response.data;
  }

  async getAllModelsByManufacturer(manufacturer) {
    const url = URL + "equipment/models/getByManufacturer";
    const data = new FormData();
    data.append("hospitalId", getHospitalId());
    data.append("username", getUserName());
    data.append("manufacturer",manufacturer);
    const response = await axios.post(url,data);
    return response.data;
  }
}

export default new GetData();
