import axios from "axios";
import { getHospitalId, getUserName } from "../Component/UserStatus";

const URL = "http://localhost:8080/"; 
class GetData{

    getAllTrusts(){
        var url = URL+"trusts/all";
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllHospitals(){
        var url = URL+"hospitals/all";
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllHospitalsByTrust(id){
        var url = URL+"hospitals/all/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllEquipmentByHospital(id){
        var url = URL+"equipment/hospitalId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllEquipmentByTrust(id){
        var url = URL+"equipment/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllGroupsByTrust(id){
        var url = URL+"usergroup/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllGroupsByHospital(id){
        var url = URL+"usergroup/hospitalId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }
    
    getAllIssuesByHospital(id){
        var url = URL+"issues/hospitalId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllIssuesByTrust(id){
        var url = URL+"issues/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    setIssueSolved(id,solved){
        var url = URL+"issues/issueId="+id;
        var data = new FormData();
        data.append("solved",solved);
        return axios.post(url,data);
    }

    getHospitalById(id){
        var url = URL+"hospitals/hospitalId="+id;
        return axios.get(url);
    }

    getAllAdmins(){
        var url = URL+"usergroup/all/admins";
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getReceivedSharings(id,username){
        var url = URL+"mail/receiver/hospitalId="+id+" username="+username;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getFile(id){
        var url = URL +"file/download/"+id;
        var data = new FormData();
        data.append("username",getUserName());
        data.append("hospitalId",getHospitalId())
        return axios.get(url,data).then((response)=>{
            return response.data;
        });
    }

    login(hospitalId,username,password){
        var url = URL+"usergroup/login";
        var data = new FormData();
        var id = String(hospitalId);
        console.log(id);
        data.append("hospitalId",id);
        data.append("username",username);
        data.append("password",password);

        return axios.post(url,data).then((response)=>{
            console.log(response.data);
            return response.data;
        });
    }
}
 
export default new GetData();