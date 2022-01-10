import axios from "axios";
import {Buffer} from 'buffer';

class GetData{

    getAllTrusts(){
        var url = "http://localhost:8080/trusts/all";
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllHospitals(){
        var url = "http://localhost:8080/hospitals/all";
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllHospitalsByTrust(id){
        var url = "http://localhost:8080/hospitals/all/trustID="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllEquipmentByHospital(id){
        var url = "http://localhost:8080/equipment/hospitalId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllEquipmentByTrust(id){
        var url = "http://localhost:8080/equipment/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllGroupsByTrust(id){
        var url = "http://localhost:8080/usergroup/trustId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }

    getAllGroupsByHospital(id){
        var url = "http://localhost:8080/usergroup/hospitalId="+id;
        return axios.get(url).then((response)=>{
            return response.data;
        });
    }
    
}
 
export default new GetData();