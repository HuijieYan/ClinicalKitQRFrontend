import axios from "axios";

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
        var url = URL+"hospitals/all/trustID="+id;
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
        var url = URL+"issues/issueId="+id+" solved="+solved;
        console.log(url);
        return axios.post(url);
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
}
 
export default new GetData();