import { useState } from "react";
import { Button, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';

const InboxEquipmentList = ({equipments}) => {
    const[selected,setSelected] = useState([]);
    
    const handleSelected = (id) =>{
        const index = selected.indexOf(id);
        const list = [...selected];
        if (index === -1){
            list.push(id);    
        }else{
            list.splice(index,1);
        }
        setSelected(list);
    }

    return ( 
        <div>
        {[...equipments].map((equipment)=>{
                return(
                    <ListItem>
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
                            <Button>OPEN</Button>
                        </ListItemButton>
                    </ListItem>
                );
            })
        }
        </div>
     );
}
 
export default InboxEquipmentList;
