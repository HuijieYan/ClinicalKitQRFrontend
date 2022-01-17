import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getHospitalId, getLevel, getTrustId } from "../Component/UserStatus";
import Auxiliary from "../Functions/Auxiliary";
import GetData from "../Functions/GetData";

const UsergroupEditPage = () => {
    const history = useHistory();
    const [groupName, setGroupname] = useState("");
    const [groupUsername, setGroupUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hospitalId,setHospitalId] = useState("-1");
    const [hospitals,setHospitals] = useState([]);
    const [email,setEmail] = useState("");
    const [isAdmin,setIsAdmin] = useState(false);
    const trustId = getTrustId();
    const url = "http://localhost:8080/usergroup/register/";
    
    async function submit (history){
        if (hospitalId === "-1" || Auxiliary.isEmpty(groupName)|| Auxiliary.isEmpty(groupUsername)||Auxiliary.isEmpty(password)){
            return;
        }
        var postUrl = url+"trustID="+trustId+" hospitalID="+hospitalId+" name="+groupName+" username="+groupUsername+" password="+password+" isAdmin="+isAdmin+" email="+email;
        axios.post(postUrl).then((response)=>{
            const successful = response.data;
            if (successful){
                history.push("/usergroupTable");
            }else{
                history.push("/loginFail");
                //waiting for invalid page to be wrote
            }
        });
    }
    
    

    useEffect(()=>{
        GetData.getAllHospitalsByTrust(trustId).then((data)=>{setHospitals(data)});
    },[]);
    //renders only once for fetching selection options

    const getOptions = ()=>{
        var level = getLevel();
        if (level === 3){
            return (
            <select value={hospitalId} onChange={(e)=>setHospitalId(e.target.value)}>
                <option value="-1" label="Select Hospital"/>
                {hospitals.map(hospital=>(
                    <option key={hospital.hospitalId} value={hospital.hospitalId} label={hospital.hospitalName}/>
                ))}
            </select>
            )
        }
        else if (level === 2){
            var hospital = GetData.getHospitalById(getHospitalId());
            return (
            <select value={hospitalId} onChange={(e)=>setHospitalId(e.target.value)}>
                <option key={hospital.hospitalId} value={hospital.hospitalId} label={hospital.hospitalName}/>
            </select>
                )
        }
    }

    return (  
        <div>
            <Form>
                <Form.Label>Hostpital</Form.Label>
                {getOptions()}   
            </Form>
            <Form>
                <Form.Group id="groupName">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="groupName" placeholder="Enter Usergroup's name" value={groupName} onChange={(e)=>setGroupname(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="email">
                    <Form.Label>Email Address(optional)</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="groupUsername">
                    <Form.Label>Departmental Username</Form.Label>
                    <Form.Control type="groupUsername" placeholder="Enter Departmental Username" value={groupUsername} onChange={(e)=>setGroupUsername(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="groupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <FormControlLabel control={<Checkbox value={isAdmin} onChange={(e)=>{setIsAdmin(e.target.checked)}}/>} label="Is Administrator"/>
            <Button id="submitButton" type="submit" onClick={()=>submit(history)}>Submit</Button>
        </div>
    );
}
 
export default UsergroupEditPage;