import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';

//list of buttons a the side of inbox
const InboxSideBar = () => {
    const [selected, setSelected] = useState(0);

    const handleSelect = (event, index) => {
        setSelected(index);
    };

    return ( 
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                selected={selected === 0}
                onClick={(e) => handleSelect(e, 0)}
                >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItemButton>
                <ListItemButton
                selected={selected === 1}
                onClick={(e) => handleSelect(e, 1)}
                >
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                </ListItemButton>
                <ListItemButton
                selected={selected === 2}
                onClick={(e) => handleSelect(e, 2)}
                >
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
            </List>
            <Divider/>
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                selected={selected === 3}
                onClick={(e) => handleSelect(e, 3)}
                >
                <ListItemText primary="Bin" />
                </ListItemButton>
            </List>
        </Box>
     );
}
 
export default InboxSideBar;