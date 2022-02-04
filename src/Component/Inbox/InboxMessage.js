import {  useState } from "react";
import { useEffect } from "react";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../UserStatus";
import InboxMessageList from "./InboxMessageList";
import InboxSideBar from "./InboxSideBar";

const InboxMessage = ({selected}) => {
    const [data,setData] = useState([]);
    

    useEffect(()=>{
        if (selected ===0){
            GetData.getReceivedSharings(getHospitalId(),getUserName()).then((data)=>{
                setData(data);
            });
        }else{
            GetData.getSentSharings(getHospitalId(),getUserName()).then((data)=>{
                setData(data);
            });
        }
    },[selected]);


    return (
        <>
        <InboxMessageList data={data}/>
        </>
    );
}
 
export default InboxMessage;