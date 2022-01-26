import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {Button} from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";

//list of buttons a the side of inbox
const InboxSideBar = () => {
    const [selected, setSelected] = useState(0);

    const handleSelect = (event, index) => {
        console.log(index);
        setSelected(index);
    };

    return (

        <Box sx={{maxWidth: '30%', marginTop: '1%'}}>
            <div style={{textAlign: "left"}}>
                <Button style={{margin: '2%'}}>
                    <CreateNewFolderIcon/> New Share
                </Button>
            </div>

            <Divider/>
            <List component="nav">
                <ListItemButton
                selected={selected === 0}
                onClick={(e) => handleSelect(e, 0)}
                >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                </ListItemButton>
                <ListItemButton
                selected={selected === 1}
                onClick={(e) => handleSelect(e, 1)}
                >
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent"/>
                </ListItemButton>
            </List>
            <Divider/>
        </Box>
     );
}
 
export default InboxSideBar;