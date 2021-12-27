import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Auxiliary from "../Functions/Auxiliary";
import GetData from "../Functions/GetData";

const HospitalCreationPage = () => {
    const history = useHistory();
    const [trusts,setTrusts] = useState([]);
    const [trustId,setTrustId] = useState("-1");
    const [hospitalName,setHospitalName] = useState("");
    const url = "http://localhost:8080/hospitals/register/";

    async function submit(history){
        if (trustId === "-1" || Auxiliary.isEmpty(hospitalName)){
            return;
        }
        var postUrl = url+"trustID="+trustId+" name="+hospitalName;
        axios.post(postUrl).then((response)=>{
            const successful = response.data;
            if (successful){
                history.push("/home");
            }else{
                history.push("/loginFail");
                //waiting for invalid page to be wrote
            }
        })
    }

    useEffect(()=>{
        GetData.getAllTrusts().then((data)=>{setTrusts(data)});
        //set trusts' selection option
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
                <Form.Group id="hospitalName">
                    <Form.Label>Hospital Name</Form.Label>
                    <Form.Control type="hospitalName" placeholder="Enter hospital's name" value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            <Button id="submitButton" type="submit" onClick={()=>submit(history)}>Submit</Button>
        </div>
     );
}
 
export default HospitalCreationPage;