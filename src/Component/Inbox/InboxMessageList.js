import { useCallback, useEffect } from "react";
import InboxDetailedMessage from "./InboxDetailedMessage";
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box, typography } from "@mui/system";
import { Fragment, useState } from "react";

const InboxMessageList = ({data}) => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [vacant,setVacant] = useState(true);
    const [currentMailId,setCurrentMailId] = useState(-1);
    const [description,setDescription] = useState("Select An Sharing");
    const [title,setTitle] = useState("");

    const handleOpenMail = useCallback((id)=>{
        //console.log(data);
        //console.log(id);
        
        var mailData = data[id];
        if (vacant){
            console.log("vacant is true");
            var mail = mailData[0];
            setCurrentMailId(id);
            setTitle(mail.title);
            setDescription(mail.description);
            setVacant(false);
        }else{
            console.log("vacant is false");
            if (currentMailId === id){
                setTitle("");
                setDescription("Select a Sharing");
                setCurrentMailId(-1);
                setVacant(true);
                //the mail details disappears and this section becomes vacant
            }else{
                setCurrentMailId(id);
                setTitle(mailData[0].title);
                setDescription(mailData[0].description);
            }
        }
        console.log(currentMailId);
    },[vacant,currentMailId,data]);
    //usecallbacks rerenders when vacanr and currentMailId changes by set states 
    
    useEffect(()=>{
        var rows = [];

        if (data.length === 0){
            rows.push(<ListItem alignItems="flex-start" key={0}><Typography>No sharings received yet</Typography></ListItem>);
        }
            
        for (let i = 0;i<data.length;i++){
            var mail = data[i][0];
            var sender = data[i][1];
            var senderinfo = sender.name;
            var descriptionSlice = String(mail.description).substring(0,48);
            if (String(sender.specialty).length > 0){
                senderinfo = sender.name + "-"+sender.specialty;
            }
            rows.push(
                <ListItem alignItems="flex-start" key={i}>
                <ListItemButton key={i} onClick={(e)=>{handleOpenMail(i)}}>
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
                rows.push(<Divider key={-1}/>);
            }
        }
        //console.log(data);
        setDisplayMailList(rows);
    },[data,handleOpenMail]);
    
    return (
        <div>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {displayMailList}
                </List> 
            </Box>
            <InboxDetailedMessage title={title} description={description} vacant={vacant}/>
        </div>
     );
}
 
export default InboxMessageList;