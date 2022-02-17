import axios from "axios";
import { getHospitalId, getUserName } from "./UserStatus";

const URL = "http://localhost:8080/";

class DeleteData {
  deleteEquipment(id) {
    axios.delete(URL + "equipment/delete/id=" + id);
  }

  deleteIssue(id) {
    axios.delete(URL + "issues/delete/issueId=" + id);
  }

  deleteUsergroup(hospitalId, username){
    axios.delete(
      URL +
        "usergroup/delete/hospitalId=" +
        hospitalId +
        " username=" +
        username
    );
  }

  deleteMail(id){
    var url = URL+"mail/delete";
    var data = new FormData();
    data.append("id",id);
    data.append("hospitalId",getHospitalId());
    data.append("username",getUserName());
    axios.post(url,data);
  }
}

export default new DeleteData();
