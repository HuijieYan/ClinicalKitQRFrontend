import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Button } from "react-bootstrap";
import InboxMessage from "./InboxMessage";

/**
 * inbox sidebar contain three button, inbox: received shares, send: sent shares, new Share: create a new share
 * @class InboxSideBar
 * @memberof module:Inbox
 * @constructor
 */

const InboxSideBar = () => {
    const [selected, setSelected] = useState(-1);

    /**
     * @property {Function} handleSelect
     * set the selected button index in order to show the corresponding component
     */
    const handleSelect = (index) => {
        setSelected(index);
    };

    return (
        <>
            <Box
                sx={{
                    width: "15%",
                    padding: "1%",
                    borderRight: "solid",
                    borderWidth: "1px",
                    minWidth: "150px",
                }}
            >

                <div style={{ textAlign: "left", marginBottom: '5%' }}>
                    <Button onClick={() => handleSelect(0)}>
                        <CreateNewFolderIcon />New Share
                    </Button>
                </div>

                <Divider />

                <List component="nav">
                    <ListItemButton
                        selected={selected === 1}
                        onClick={() => handleSelect(1)}
                    >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                    </ListItemButton>

                    <ListItemButton
                        selected={selected === 2}
                        onClick={() => handleSelect(2)}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent" />
                    </ListItemButton>
                </List>

                <Divider />

            </Box>
            <InboxMessage selected={selected} />
        </>
    );
};

export default InboxSideBar;
