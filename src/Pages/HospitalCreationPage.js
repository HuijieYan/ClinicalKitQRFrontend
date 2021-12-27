import { Form } from "react-bootstrap";
import GetData from "../Functions/GetData";

const HospitalCreationPage = () => {
    const [trusts,setTrusts] = useState([]);
    const [trustId,setTrustId] = useState("-1");
    const [hospitalName,setHospitalName] = useState("-1");

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
        </div>
     );
}
 
export default HospitalCreationPage;