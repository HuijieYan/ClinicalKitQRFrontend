import { useEffect, useCallback, useState } from "react";
import { Button, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';

const InboxEquipmentList = ({equipments}) => {
    const[selected,setSelected] = useState([]);
    const[equipmentSection,setEquipmentSection] = useState([]);
    
    const handleSelected = useCallback((id) =>{
        console.log(id);
        var index = selected.indexOf(id);
        var list = selected;
        if (index === -1){
            list.push(id);    
        }else{
            list.splice(index,1);
        }
        console.log(list);
        setSelected(list);
    },[selected])

    useEffect(()=>{
        var equipSection = [];
        for (let i = 0;i<equipments.length;i++){
            equipSection.push(<ListItem key={equipments[i].equipmentId}>
                <ListItemButton key={equipments[i].equipmentId} onClick={(e)=>{handleSelected(equipments[i].equipmentId)}}>
                    <ListItemIcon>
                        <Checkbox
                            checked={selected.indexOf(equipments[i].equipmentId) !== -1}
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary={equipments[i].name}/>
                    <Button>OPEN</Button>
                </ListItemButton>
            </ListItem>);
        }
        setEquipmentSection(equipSection);
    }
    ,[equipments,selected,handleSelected])

    return ( 
        {equipmentSection}
     );
}
 
export default InboxEquipmentList;
{equipments.map((equipment)=>{
    return(
        <ListItem key={equipment.equipmentId}>
            <ListItemButton key={equipment.equipmentId} onClick={(e)=>{handleSelected(equipment.equipmentId);console.log(selected);}}>
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
                <Button>OPEN</Button>
            </ListItemButton>
        </ListItem>
    );
})}