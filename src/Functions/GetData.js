import axios from "axios";
import { getHospitalId, getUserName, getLevel, getTrustId } from "../Component/UserStatus";

const URL = "http://localhost:8080/"; 
class GetData{

    async getAllTrusts(){
        var url = URL+"trusts/all";
        const response = await axios.get(url);
        return response.data;
    }

    async getAllHospitals(){
        var url = URL+"hospitals/all";
        const response = await axios.get(url);
        return response.data;
    }

    async getAllHospitalsByTrust(id){
        var url = URL+"hospitals/all/trustId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getEquipment(){
        var level = getLevel();
        if (level === 2){
            const data = await this.getAllEquipmentByHospital(getHospitalId());
            return data;
        }else if(level === 3){
            const data_1 = await this.getAllEquipmentByTrust(getTrustId());
            console.log(data_1);
            return data_1;
        }
    }

    async getAllEquipmentByHospital(id){
        var url = URL+"equipment/hospitalId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getAllEquipmentByTrust(id){
        var url = URL+"equipment/trustId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getGroups(){
        var level = getLevel();
        if (level === 2){
            const data = await this.getAllGroupsByHospital(getHospitalId());
            return data;
        }else if(level === 3){
            const data_1 = await this.getAllGroupsByTrust(getTrustId());
            return data_1;
        }
    }

    async getAllGroupsByTrust(id){
        var url = URL+"usergroup/trustId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getAllGroupsByHospital(id){
        var url = URL+"usergroup/hospitalId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getIssues(){
        var level = getLevel();
        if (level === 2){
            const data = await this.getAllIssuesByHospital(getHospitalId());
            return data;
        }else if(level === 3){
            const data_1 = await this.getAllIssuesByTrust(getTrustId());
            return data_1;
        }
    }
    
    async getAllIssuesByHospital(id){
        var url = URL+"issues/hospitalId="+id;
        const response = await axios.get(url);
        return response.data;
    }

    async getAllIssuesByTrust(id){
        var url = URL+"issues/trustId="+id;
        const response = await axios.get(url);
        return response.data;
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

    async getAllAdmins(){
        var url = URL+"usergroup/all/admins";
        const response = await axios.get(url);
        return response.data;
    }

    async getAllAdminsInOrder(){
        var url = URL+"trusts/all/admins";
        const response = await axios.get(url);
        return response.data;
    }

    async getReceivedSharings(id,username){
        var url = URL+"mail/receiver";
        var data = new FormData();
        data.append("hospitalId",id);
        data.append("username",username);
        const response = await axios.post(url, data);
        return response.data;
    }

    async getSentSharings(id,username){
        var url = URL+"mail/sender";
        var data = new FormData();
        data.append("hospitalId",id);
        data.append("username",username);
        const response = await axios.post(url, data);
        return response.data;
    }

    async getFile(id){
        var url = URL +"file/download/"+id;
        var data = new FormData();
        data.append("username",getUserName());
        data.append("hospitalId",getHospitalId())
        const response = await axios.get(url, data);
        return response.data;
    }

    async login(hospitalId,username,password){
        var url = URL+"usergroup/login";
        var data = new FormData();
        var id = String(hospitalId);
        data.append("hospitalId",id);
        data.append("username",username);
        data.append("password",password);
        console.log("In login");

        return await axios.post(url,data).then((response)=>{
            console.log(response.data);
            return response.data;
        });
    }

    async getTypes(){
        var url = URL+"equipment/types";
        const response = await axios.get(url);
        return response.data;
    }

    async getCategories(){
        var url = URL+"equipment/categories";
        const response = await axios.get(url);
        return response.data;
    }

    async searchByName(name,category,type){
        var url = URL+"equipment/search";
        var data = new FormData();
        console.log(name);
        if (category === "None"){
            category = "";
        }
        if(type === "None"){
            type="";
        }
        data.append("hospitalId",getHospitalId());
        data.append("username",getUserName());
        data.append("category",category);
        data.append("type",type);
        data.append("name",name);
        const response = await axios.post(url, data);
        console.log(response.data);
        return response.data;
    }

    async getEquipmentById(id){
        var url = URL+"equipment/get";
        var data = new FormData();
        data.append("hospitalId",getHospitalId());
        data.append("username",getUserName());
        data.append("id",id);
        const response = await axios.post(url,data);
        return response.data;
    }
}
 
export default new GetData();