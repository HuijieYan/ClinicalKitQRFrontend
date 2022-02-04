import { Box } from "@mui/system";
import { Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import InboxButtonList from "./InboxButtonList";

const InboxDetailedMessage = ({title,description,equipments,vacant}) => {
    const saveOptions = ["SAVE","SAVE ALL"];
    const declineOptions = ["DECLINE","DECLINE ALL"];

    const[divider,setDivider] = useState(null);
    const[buttons,setButtons] = useState(false);
    const[selected,setSelected] = useState([]);
    const[equipmentSection,setEquipmentSection] = useState([]);

    const handleSelected = (id) => () =>{
        console.log(id);
        const index = selected.indexOf(id);
        const list = [...selected];

        if (index === -1){
            list.push(id);    
        }else{
            list.splice(index,1);
        }
        console.log(list);
        setSelected(list);
    }

    useEffect(()=>{
        //console.log("rerendered");
        if(vacant){
            setDivider(null);
            setEquipmentSection([]);
            setButtons(false);
        }else{
            var equipSection = [];
            setDivider(<Divider/>);
            setEquipmentSection(equipSection);
            setButtons(true);
        }
    },[vacant]);


    return ( 
        <Box sx={{width: '1', padding: '1%', overflow: 'scroll', paddingTop: '2%'}}>
            <Typography style={{marginBottom: '1%'}}>{title}</Typography>
            {divider}
            <List>
            {
                equipments.map((equipment)=>{
                return(
                    <ListItem key={equipment.equipmentId} secondaryAction={
                        <Button edge="end">OPEN</Button>
                    } disablePadding>
                        <ListItemButton onClick={handleSelected(equipment.equipmentId)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={selected.indexOf(equipment.equipmentId) !== -1}
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemIcon>
                                <ArticleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={equipment.name}/>
                            
                        </ListItemButton>
                    </ListItem>
                );
            })}
            </List>

            {divider}
            <Typography style={{margin:'3%'}}>{description}</Typography>
            {divider}
            {buttons && (
                <div style={{margin: '2%'}}>
                    <InboxButtonList options={saveOptions}/>
                    <span style={{marginLeft: '3%', marginRight: '3%'}}/>
                    <InboxButtonList options={declineOptions}/>
                </div>
            )}
        </Box>
     );
}
 
export default InboxDetailedMessage;