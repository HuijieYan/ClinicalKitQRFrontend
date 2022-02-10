import axios from "axios";

const URL = "http://localhost:8080/";

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
}

export default new DeleteData();
