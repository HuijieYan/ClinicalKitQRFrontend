import { memo, useCallback, useEffect } from "react";
import InboxDetailedMessage from "./InboxDetailedMessage";
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import InboxNewSharingComponent from "./InboxNewSharingComponent";
import { useSelector } from "react-redux";

const InboxMessageList = memo(({selected,clicked}) => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [vacant,setVacant] = useState(true);
    const [currentMailId,setCurrentMailId] = useState(-1);
    const [displayState,setDisplayState] = useState(0);
    const [displayIndex,setDisplayIndex] = useState(-1);
    const data = useSelector((state)=>state);
 
    /*const handleOpenMail = useCallback((id)=>{
        const mailData = data[id];
        setDisplayState(0);
        console.log(id);
        //if displaying new share editor, change to display detailed message section
        if (vacant || currentMailId !== id){
            const mail = mailData[0];
            setCurrentMailId(currentMailId=>id);
            setTitle(mail.title);
            setDescription(mail.description);
            setVacant(vacant=>false);
            SetEquipments(mail.equipments);
        //if vacant, display clicked message
        }else{
            setTitle("");
            setDescription("Select a Sharing");
            setCurrentMailId(currentMailId=>-1);
            setVacant(vacant=>true);
            SetEquipments([]);
            //the mail details disappears and this section becomes vacant
        }
    },[vacant,currentMailId,data]);
    */
    //usecallbacks rerenders when vacant and currentMailId changes 
    
    const handleOpenMail = useCallback((id)=>{
        setDisplayState(0);
        setDisplayIndex(id);
        //send the mail data to the display component
        //the display component will decide what to display based on the data received
    },[data]);

    useEffect(()=>{
        //setting the list of sharings
       function rendering(){
           const rows = [];
        if (data.length === 0){
            rows.push(<ListItem alignItems="flex-start" key={0}><Typography>No sharings received yet</Typography></ListItem>);
        }
        
        for (let i = 0;i<data.length;i++){
            const mail = data[i][0];
            const sender = data[i][1];
            var senderinfo = "";
            if(sender === null){
                senderinfo = "Deleted User";
            }else{
                senderinfo = sender.name;
                if (sender.specialty !== null){
                    senderinfo = sender.name + "-"+sender.specialty.specialty;
                }
            }
            
            const descriptionSlice = String(mail.description).substring(0, 48);
           
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
        function renderDetialedMessage(){
            if (displayIndex===currentMailId){
                setCurrentMailId(-1);
                setVacant(true);
                //the mail details disappears and this section becomes vacant
            }else{      
                setCurrentMailId(displayIndex);
                setVacant(false);
            }
            setDisplayIndex(-1);
            //set the display data back to empty in order to mark it as used
        }
        
        if (displayIndex >=0){
            renderDetialedMessage();
        }
    },[displayIndex,currentMailId]);

    useEffect(()=>{
        setCurrentMailId(-1);
        setVacant(true);
        setDisplayState(1);
        //when clicked new share, hide the detailed message component
    },[clicked]);

    useEffect(()=>{
        setCurrentMailId(-1);
        setVacant(true);
        setDisplayState(0);
        //when clicked a button on the side bar, hide the detailed message component
    },[selected])
    
    return (
        <>
            <Box sx={{width: '20%', padding: '1%', overflow: 'scroll', borderRight: 'solid', borderWidth: '1px',  minWidth: '200px'}}>
                <List>
                    {displayMailList}
                </List>
                <Divider/>
            </Box>
            <InboxDetailedMessage index={currentMailId} vacant={vacant} display={displayState===0} option={selected}/>
            <InboxNewSharingComponent display={displayState===1} />
        </>
     );
})
 
export default InboxMessageList;