import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Auxiliary from "../Functions/Auxiliary";
import GetData from "../Functions/GetData";

const UsergroupEditPage = () => {
    const history = useHistory();
    const [groupName, setGroupname] = useState("");
    const [groupUsername, setGroupUsername] = useState("");
    const [password, setPassword] = useState("");
    const [trusts,setTrusts] = useState([]);
    const [trustId,setTrustId] = useState("-1");
    const [hospitalId,setHospitalId] = useState("-1");
    const [hospitals,setHospitals] = useState([]);
    const url = "http://localhost:8080/usergroup/register/";
    
    async function submit (history){
        if (trustId === "-1"||hospitalId === "-1" || Auxiliary.isEmpty(groupName)|| Auxiliary.isEmpty(groupUsername)||Auxiliary.isEmpty(password)){
            return;
        }
        var postUrl = url+"trustID="+trustId+" hospitalID="+hospitalId+" name="+groupName+" username="+groupUsername+" password="+password;
        axios.post(postUrl).then((response)=>{
            const successful = response.data;
            if (successful){
                history.push("/home");
            }else{
                history.push("/loginFail");
                //waiting for invalid page to be wrote
            }
        });
    }
    
    useEffect(()=>{
        GetData.getAllTrusts().then((data)=>{setTrusts(data)});
        //set trusts' selection option
        GetData.getAllHospitals().then((data)=>{setHospitals(data)});
    },[]);
    //renders only once for fetching selection options

    return (  
        <div>
            <Form>
                <Form.Label>Trust</Form.Label>
                <select value={trustId} onChange={(e)=>setTrustId(e.target.value)}>
                    <option value="-1" label="Select Trust"/>
                    {trusts.map(trust=>(
                        <option key={trust.trustId} value={trust.trustId} label={trust.trustName}/>
                    ))}
                </select>
            </Form>
            <Form>
                <Form.Label>Hostpital</Form.Label>
                <select value={hospitalId} onChange={(e)=>setHospitalId(e.target.value)}>
                    <option value="-1" label="Select Hospital"/>
                    {hospitals.map(hospital=>(
                        <option key={hospital.hospitalId} value={hospital.hospitalId} label={hospital.hospitalName}/>
                    ))}
                </select>
            </Form>
            <Form>
                <Form.Group id="groupName">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="groupName" placeholder="Enter Usergroup's name" value={groupName} onChange={(e)=>setGroupname(e.target.value)}></Form.Control>
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
            <Button id="submitButton" type="submit" onClick={()=>submit(history)}>Submit</Button>
        </div>
    );
}
 
export default UsergroupEditPage;