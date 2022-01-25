import { useRef, useState } from "react";
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const InboxButtonList = ({options}) => {
    const [index,setIndex] = useState(0);
    const [open,setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleOpenList = ()=>()=>{
        console.log("clicked open");
        setOpen(!open);
    }

    const handleClick = (event, index) => {
        setIndex(index);
        setOpen(false);
      };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };

    return ( 
    <div>
        <ButtonGroup ref={anchorRef}>
                    <Button>{options[index]}</Button>
                    <Button
                    size="small"
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleOpenList()}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                >
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                    transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                        {options.map((option, clickIndex) => (
                            <MenuItem
                            key={option}
                            selected={clickIndex === index}
                            onClick={(event) => handleClick(event, clickIndex)}
                            >
                            {option}
                            </MenuItem>
                        ))}
                        </MenuList>
                    </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
                </Popper>
        </div>
     );
}
 
export default InboxButtonList;