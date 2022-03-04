import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from "react-redux";
import { storeMailData } from "../../Storage/Actions/actions";
import Uploader from "../../Functions/Uploader";

//referenced some code from https://mui.com/components/button-group/

const InboxButtonList = ({selected,setSelected,currentMailIndex}) => {
    const options = ["SAVE","SAVE ALL"];
    const [index,setIndex] = useState(0);
    const [open,setOpen] = useState(false);
    const data = useSelector((state)=>state);
    const dispatch = useDispatch();
    const anchorRef = useRef(null);

    const handleOpenList = ()=>()=>{
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

    const handleSave = (selections,mails,index)=>{
        const currentMail = mails[index][0];
        const equipments = [...currentMail.equipments];
        const ids = [];
        for (let i =0;i<selections.length;i++){
            equipments[selections[i]].saved = true;
            //change saved attributes in equipment into true
            ids.push(equipments[i].id);
        }
        Uploader.saveEquipments(ids);
        currentMail["equipments"] = equipments;
        mails[index][0] = currentMail;
        dispatch(storeMailData(mails));
        //update the local data 
        setSelected([]);
    }

    const handleSaveAll = (selections,mails,index)=>{
        const currentMail = mails[index][0];
        const equipments = [...currentMail.equipments];
        const ids = [];
        for (let i =0;i<equipments.length;i++){
            const equipment = equipments[i];
            if (!equipment.saved){
                equipments[i].saved = true;
                //change saved attributes in equipment into true
                ids.push(equipments[i].id);
            }
        }
        Uploader.saveEquipments(ids);
        currentMail["equipments"] = equipments;
        mails[index][0] = currentMail;
        dispatch(storeMailData(mails));
        //update the local data 
        setSelected([]);
    }

    const functions = [handleSave,handleSaveAll];

    useEffect(()=>{
        setIndex(0);
        //if viewing mail changed, reset the index of buttons
    },[currentMailIndex])

    return (
        <>
            <ButtonGroup ref={anchorRef}>
                <Button onClick={()=>{functions[index](selected,data,currentMailIndex)}}>{options[index]}</Button>
                <Button size="small" onClick={handleOpenList()}>
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            >

            {
                ({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
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
                )
            }
            </Popper>
        </>
    );
}
 
export default InboxButtonList;