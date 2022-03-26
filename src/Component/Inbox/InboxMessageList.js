import { memo, useCallback, useEffect } from "react";
import InboxDetailedMessage from "./InboxDetailedMessage";
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import InboxNewSharingComponent from "./InboxNewSharingComponent";
import { useSelector } from "react-redux";

/**
 * Show detailed received or sent shares as a list, and show detail sharing of user selected in the list
 * @class InboxMessageList
 * @memberof module:Inbox
 * @constructor
 * @param {number} selected -the selected button index
 */

const InboxMessageList = memo(({selected}) => {
    const [displayMailList,setDisplayMailList] = useState([]);
    const [vacant,setVacant] = useState(true);
    const [currentMailId,setCurrentMailId] = useState(-1);
    const [displayIndex,setDisplayIndex] = useState(-1);
    const data = useSelector((state) => state);

    /**
     * @property {Function} handleOpenMail
     * send the mail data to the display component,
     * the display component will decide what to display based on the data received
     */
    const handleOpenMail = useCallback((id)=>{
        setDisplayIndex(id);
    },[data]);


    useEffect(initializeShareList,[data, handleOpenMail]);

    /**
     * @property {Function} initializeShareList
     * show the selected share by pushing share data to the component, called when data or selected share changed
     */
    function initializeShareList(){
        function rendering(){
            const rows = [];
            if (data.length === 0){
                rows.push(<ListItem alignItems="flex-start" key={0}><Typography>No sharings received yet</Typography></ListItem>);
            }

            for (let i = 0;i<data.length;i++){
                const mail = data[i][0];
                const sender = data[i][1];
                let senderinfo = "";
                if(sender === null){
                    senderinfo = "Deleted User";
                }else{
                    senderinfo = sender.name;
                    if (sender.specialty !== ""){
                        senderinfo = sender.name + "-"+sender.specialty;
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
                rows.push(<Divider />);
            }
            setDisplayMailList(rows);
        }

        rendering();
    }

    useEffect(()=>{
        function renderDetialedMessage(){
            if (displayIndex === currentMailId){
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
        
        if (displayIndex >= 0){
            renderDetialedMessage();
        }
    },[displayIndex]);

    useEffect(() => {
        setCurrentMailId(-1);
        setDisplayIndex(-1);
        setVacant(true);
        //when clicked a button on the side bar, hide the detailed message component
    },[selected])
    
    return (
        <>
            {selected > 0 &&
            <>
                <Box sx={{width: '20%', padding: '1%', overflow: 'auto', borderRight: 'solid', borderWidth: '1px',  minWidth: '200px'}}>
                    <List>
                        {displayMailList}
                    </List>
                </Box>
                <InboxDetailedMessage index={currentMailId} vacant={vacant} option={selected}/>
            </>
            }

            {selected === 0 && <InboxNewSharingComponent />}
        </>
     );
})
 
export default InboxMessageList;