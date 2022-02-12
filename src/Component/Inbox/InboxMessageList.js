import { memo, useCallback, useEffect } from "react";
import InboxDetailedMessage from "./InboxDetailedMessage";
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box, typography } from "@mui/system";
import { Fragment, useState } from "react";
import InboxNewSharingComponent from "./InboxNewSharingComponent";

const InboxMessageList = memo(({data,selected,clicked}) => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [equipments,SetEquipments] = useState([]);
    const [vacant,setVacant] = useState(true);
    const [currentMailId,setCurrentMailId] = useState(-1);
    const [description,setDescription] = useState("Select An Sharing");
    const [title,setTitle] = useState("");
    const [displayState,setDisplayState] = useState(0);
    const [displayData,SetDisplayData] = useState([]);
 
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
        var mailData = data[id];
        setDisplayState(0);
        console.log(id);
        SetDisplayData([id,mailData]);
        //send the mail data to the display component
        //the display component will decide what to display based on the data received
    },[data]);

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
            var senderinfo = sender.name;
            const descriptionSlice = String(mail.description).substring(0, 48);
            if (sender.specialty !== null){
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
        function renderDetialedMessage(){
            var id = displayData[0];
            if (id===currentMailId){
                setTitle("");
                setDescription("Select a Sharing");
                setCurrentMailId(-1);
                setVacant(true);
                SetEquipments([]);
                //the mail details disappears and this section becomes vacant
            }else{      
                var mail = displayData[1][0];
                console.log(mail);
                setCurrentMailId(id);
                setTitle(mail.title);
                setDescription(mail.description);
                setVacant(false);
                SetEquipments(mail.equipments);
            }
            SetDisplayData([]);
            //set the display data back to empty in order to mark it as used
        }
        
        if (displayData.length >0){
            renderDetialedMessage();
        }
    },[displayData,currentMailId]);

    useEffect(()=>{
        setTitle("");
        setDescription("Select a Sharing");
        setCurrentMailId(-1);
        setVacant(true);
        SetEquipments([]);
        setDisplayState(1);
        //when clicked new share, hide the detailed message component
    },[clicked]);

    useEffect(()=>{
        setTitle("");
        setDescription("Select a Sharing");
        setCurrentMailId(-1);
        setVacant(true);
        SetEquipments([]);
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
            <InboxDetailedMessage title={title} description={description} vacant={vacant} equipments={equipments} display={displayState===0}/>
            {/* <InboxNewSharingComponent display={displayState===1} /> */}
        </>
     );
})
 
export default InboxMessageList;