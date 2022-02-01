import axios from "axios";
import { getHospitalId, getUserName } from "../Component/UserStatus";

const URL = "http://localhost:8080/"; 

class FileUploader{
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
}
 
export default new FileUploader();