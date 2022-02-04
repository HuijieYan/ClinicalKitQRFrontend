import { useCallback, useEffect } from "react";
import InboxDetailedMessage from "./InboxDetailedMessage";
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box, typography } from "@mui/system";
import { Fragment, useState } from "react";
import InboxNewSharingComponent from "./InboxNewSharingComponent";

const InboxMessageList = ({data,selected,clicked}) => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [equipments,SetEquipments] = useState([]);
    const [vacant,setVacant] = useState(true);
    const [currentMailId,setCurrentMailId] = useState(-1);
    const [description,setDescription] = useState("Select An Sharing");
    const [title,setTitle] = useState("");
    const [displayDetailedMessage,setDisplayDetailedMessage] = useState(true);
    
    const handleOpenMail = useCallback((id)=>{
        const mailData = data[id];
        setDisplayDetailedMessage(true);
        //if displaying new share editor, change to display detailed message section
        if (vacant || currentMailId !== id){
            const mail = mailData[0];
            setCurrentMailId(id);
            setTitle(mail.title);
            setDescription(mail.description);
            setVacant(false);
            SetEquipments(mail.equipments);
        //if vacant, display clicked message
        }else{
            setTitle("");
            setDescription("Select a Sharing");
            setCurrentMailId(-1);
            setVacant(true);
            SetEquipments([]);
            //the mail details disappears and this section becomes vacant
        }
        console.log(currentMailId);
    },[vacant,currentMailId,data]);
    //usecallbacks rerenders when vacant and currentMailId changes 
    
    useEffect(()=>{
        //setting the list of sharings
       function rendering(){
        var rows = [];
        console.log("rerendered");
        if (data.length === 0){
            rows.push(<ListItem alignItems="flex-start" key={0}><Typography>No sharings received yet</Typography></ListItem>);
        }
        
        for (let i = 0;i<data.length;i++){
            const mail = data[i][0];
            const sender = data[i][1];
            let senderinfo = sender.name;
            const descriptionSlice = String(mail.description).substring(0, 48);
            if (String(sender.specialty.specialty).length > 0){
                senderinfo = sender.name + "-"+sender.specialty.specialty;
            }
            rows.push(
                <ListItem alignItems="flex-start" key={i}>
                <ListItemButton key={i} onClick={()=>{handleOpenMail(i)}}>
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
        setDisplayMailList(rows);
       }
       
        rendering();
        //console.log(data);
        
    },[data,handleOpenMail]);

    useEffect(()=>{
        setTitle("");
        setDescription("Select a Sharing");
        setCurrentMailId(-1);
        setVacant(true);
        SetEquipments([]);
        setDisplayDetailedMessage(false);
        //when clicked new share, hide the detailed message component
    },[clicked]);
    
    return (
        <>
            <Box sx={{width: '20%', padding: '1%', overflow: 'scroll', borderRight: 'solid', borderWidth: '1px',  minWidth: '200px'}}>
                <List>
                    {displayMailList}
                </List>
                <Divider/>
            </Box>
            <InboxDetailedMessage title={title} description={description} vacant={vacant} equipments={equipments} display={displayDetailedMessage}/>
            <InboxNewSharingComponent display={!displayDetailedMessage} />
        </>
     );
}
 
export default InboxMessageList;