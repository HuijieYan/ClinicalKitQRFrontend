import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../UserStatus";

const InboxMessage = () => {
    const [mailList,setMailList] = useState([]);
    
    useEffect(()=>{
        GetData.getReceivedSharings(getHospitalId(),getUserName()).then((data)=>{
            var rows = [];
            console.log(data);
            for (let i = 0;i<data.length;i++){
                var mail = data[i][0];
                var sender = data[i][1];
                var senderinfo = sender.name;
                var descriptionSlice = String(mail.description).substring(0,48);
                if (String(sender.specialty).length > 0){
                    senderinfo = sender.name + "-"+sender.specialty;
                }
                rows.push(<ListItem alignItems="flex-start">
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
                    </ListItem>
                );
            }
            setMailList(rows);
        });
        
    },[]);
    return ( 
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {mailList}
    </List> 
    </Box>
    );
}
 
export default InboxMessage;