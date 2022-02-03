
import { getExpireTime, getHospitalId, getPassword, getUserName, setExpireTime, setHospitalID, setLevel, setName, setPassword, setTrustID, setUserName } from "../Component/UserStatus";
import GetData from "./GetData";

export function checkLogIn(){
    var hospitalId = getHospitalId();
    var username = getUserName();
    var password = getPassword();
    //console.log(hospitalId);
    //console.log(username);
    console.log("called login");

    if (GetData.login(hospitalId,username,password).length===0){
        console.log("Not Authorised");
        return false;
    }else{
        if (new Date().valueOf()>getExpireTime()){
            console.log("Authorised but expired");
            logout();
            return false;
        }
        console.log("Authorised");
    }
    return true;
}

export function logout(){
    setPassword("");
    setHospitalID(-1);
    setUserName("");
    setTrustID(-1);
    setName("");
    setLevel(-1);
    setExpireTime(-1);
}