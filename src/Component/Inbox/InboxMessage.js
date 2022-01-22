import {  useState } from "react";
import { useEffect } from "react";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../UserStatus";
import InboxMessageList from "./InboxMessageList";

const InboxMessage = () => {
    const [data,setData] = useState([]);
    

    useEffect(()=>{
        GetData.getReceivedSharings(getHospitalId(),getUserName()).then((data)=>{
            setData(data);
        });
    },[]);


    return ( 
        <div>
            <InboxMessageList data={data}/>
        </div>
    );
}
 
export default InboxMessage;