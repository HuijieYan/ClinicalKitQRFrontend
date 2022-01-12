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
    
}
 
export default new GetData();