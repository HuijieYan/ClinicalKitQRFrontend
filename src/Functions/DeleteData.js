import axios from "axios";

const URL = "http://localhost:8080/"; 

class DeleteData {
    deleteEquipment(id){
        var data = new FormData();
        axios.delete("http://localhost:8080/equipment/delete/id="+id);
    }

    deleteIssue(id){
        axios.delete("http://localhost:8080/issues/delete/issueId="+id);
    }

    deleteUsergroup(hospitalId,username){
        axios.delete("http://localhost:8080/usergroup/delete/hospitalId="+hospitalId+" username="+username);
    }
}
 
export default new DeleteData();