import axios from "axios";
import { getHospitalId, getUserName } from "./UserStatus";

const URL = "http://localhost:8080/"; 

class Uploader{
    uploadFiles(files){
        var errorMessage = [];
        //for (let i =0;i<files.length;i++){
        var file = files[0];
        var url = URL+"file/upload";
        var data = new FormData();
        data.append("file",file);
        data.append("username",getUserName());
        data.append("hospitalId",getHospitalId());
        return axios.post(url,data).then((response)=>{
            var message = String(response.data);
            /*if (!message.includes("Successfully saved")){
                errorMessage.push(message);
            }
            */
            return response.data;
        });
        //}
    }

    submitEquipmentData(name,content,category,type){
        var data = new FormData();
        var url = URL+"equipment/save";
        data.append("name",name);
        data.append("content",content);
        data.append("category",category);
        data.append("type",type);
        data.append("hospitalId",getHospitalId());
        data.append("username",getUserName());
        return axios.post(url,data).then((response)=>{
            return response.data;
        });
    }

    updateEquipmentData(id,name,content,category,type){
        var data = new FormData();
        var url = URL+"equipment/update";
        data.append("id",id);
        data.append("name",name);
        data.append("content",content);
        data.append("category",category);
        data.append("type",type);
        data.append("hospitalId",getHospitalId());
        data.append("username",getUserName());
        return axios.post(url,data).then((response)=>{
            return response.data;
        });
    }

    sendSharings(senderHospitalId,senderUsername,equipmentIds,receivers,title,description,time){
        var url = URL + "mail/sending";
        var data = new FormData();
        data.append("senderHospitalId",senderHospitalId);
        data.append("senderUsername",senderUsername);
        data.append("receivers",receivers);
        data.append("title",title);
        data.append("description",description);
        data.append("equipmentIds",equipmentIds);
        data.append("time",time);
        return axios.post(url,data).then((response)=>{
            return response.data;
        });
    }

    saveEquipments(ids){
        var url = URL+"sentEquipment/saving";
        var data = new FormData();
        data.append("hospitalId",getHospitalId());
        data.append("ids",ids);
        axios.post(url,data);
    }
}
 
export default new Uploader();