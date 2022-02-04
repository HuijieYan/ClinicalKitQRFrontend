import axios from "axios";
import { getHospitalId, getUserName, getLevel, getTrustId } from "../Component/UserStatus";

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

    getEquipment(){
        var level = getLevel();
        if (level === 2){
            return this.getAllEquipmentByHospital(getHospitalId()).then((data)=>{
                return data;
            });
        }else if(level === 3){
            return this.getAllEquipmentByTrust(getTrustId()).then((data)=>{
                console.log(data);
                return data;
            });
        }
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

    getGroups(){
        var level = getLevel();
        if (level === 2){
            return this.getAllGroupsByHospital(getHospitalId()).then((data)=>{
                return data;
            });
        }else if(level === 3){
            return this.getAllGroupsByTrust(getTrustId()).then((data)=>{
                return data;
            });
        }
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

    getIssues(){
        var level = getLevel();
        if (level === 2){
            return this.getAllIssuesByHospital(getHospitalId()).then((data)=>{
                return data;
            });
        }else if(level === 3){
            return this.getAllIssuesByTrust(getTrustId()).then((data)=>{
                return data;
            });
        }
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
        var url = URL+"mail/receiver";
        var data = new FormData();
        data.append("hospitalId",id);
        data.append("username",username);
        return axios.post(url,data).then((response)=>{
            return response.data;
        });
    }

    getSentSharings(id,username){
        var url = URL+"mail/sender";
        var data = new FormData();
        data.append("hospitalId",id);
        data.append("username",username);
        return axios.post(url,data).then((response)=>{
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

    getTypes(){
        var url = URL+"equipment/types";
        return axios.get(url).then((response)=>{
            return response.data;
        })
    }

    getCategories(){
        var url = URL+"equipment/categories";
        return axios.get(url).then((response)=>{
            return response.data;
        })
    }

    searchByName(name,category,type){
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
        return axios.post(url,data).then((response)=>{
            console.log(response.data);
            return response.data;
        })
    }
}
 
export default new GetData();