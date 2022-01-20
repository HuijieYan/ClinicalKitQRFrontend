import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../UserStatus";

const InboxMessage = () => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [mailList,setMailList] = useState([]);
    const [opened,setOpened] = useState(false);
    const [vacant,setVacant] = useState(true);
    const [description,setDescription] = useState("Select An Sharing");
    const [title,setTitle] = useState("");
    
    function handleOpenMail(data){
        console.log(vacant);
        setVacant(!vacant);
        if(opened){
            setOpened(false);
        }else{
            setOpened(true);
        }
    }

    useEffect(()=>{
        console.log(vacant);
        //console.log(opened);
        if(!vacant){
            setTitle("");
            setDescription("Selected");
        }else{
            setTitle("");
            setDescription("Select An Sharing");
        }
        console.log(vacant);
    },[vacant]);

    useEffect(()=>{
        GetData.getReceivedSharings(getHospitalId(),getUserName()).then((data)=>{
            var rows = [];
            var mails = [];
            console.log(data);
            for (let i = 0;i<data.length;i++){
                var mail = data[i][0];
                var sender = data[i][1];
                mails.push({id: i,data: data[i]});
                var senderinfo = sender.name;
                var descriptionSlice = String(mail.description).substring(0,48);
                if (String(sender.specialty).length > 0){
                    senderinfo = sender.name + "-"+sender.specialty;
                }
                rows.push(<ListItem alignItems="flex-start" key={i}>
                    <ListItemButton id={i} onClick={(e)=>{handleOpenMail(mailList[e.target.id])}}>
                        <ListItemText
                        primary={mail.title}
                        secondary={
                            <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {senderinfo}
                            </Typography>
                            {" — "+descriptionSlice+"…"}
                            </Fragment>
                        }
                        />
                        </ListItemButton>
                    </ListItem>
                );
                if (i<data.length-1){
                    rows.push(<Divider variant="inset" component="li" />);
                }
            }
            setMailList(mails);
            setDisplayMailList(rows);
        });
    },[]);


    return ( 
    <div>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {displayMailList}
            </List> 
        </Box>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography>{description}</Typography>
        </Box>
    </div>
    );
}
 
export default InboxMessage;