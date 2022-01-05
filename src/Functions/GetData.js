import axios from "axios";

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

    getAllEquipment(){
        var url = "http://localhost:8080/equipment/all";
        return axios.get(url).then((response)=>{
            return response.data;
        })
    }
    
}
 
export default new GetData();