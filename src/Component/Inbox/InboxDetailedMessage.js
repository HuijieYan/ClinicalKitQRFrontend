import { Box } from "@mui/system";
import { Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';

const InboxDetailedMessage = ({title,description,equipments,vacant}) => {
    const[divider,setDivider] = useState(null);
    const[buttons,setButtons] = useState(null);
    const[selected,setSelected] = useState([]);
    const[equipmentSection,setEquipmentSection] = useState([]);
    
    const [checked, setChecked] = useState([0]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const handleSelected = (id) =>{
        console.log(id);
        var index = selected.indexOf(id);
        var list = selected;
        if (index === -1){
            list.push(id);    
        }else{
            list.splice(index,1);
        }
        //console.log(list);
        setSelected(list);
    }

    const checkSelected = useCallback((id) =>{
        console.log(selected.indexOf(id) !== -1);
        return selected.indexOf(id) !== -1;
    },[selected])

    useEffect(()=>{
        console.log("rerendered");
        if(vacant){
            setDivider(null);
            setEquipmentSection([]);
            setButtons(null);
        }else{
            var equipSection = [];
            setDivider(<Divider/>);
            //for (let i = 0;i<equipments.length;i++){
                /*
                equipSection.push(
                <ListItem key={equipments[i].equipmentId}>
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
                */
            //}
            setEquipmentSection(equipSection);
            setButtons(<div>
                <Button>Save</Button>
                <Button>Decline</Button>
            </div>);
        }
    },[vacant]);


    return ( 
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography>{title}</Typography>
            {divider}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}

{equipments.map((equipment)=>{
    return(
        <ListItem key={equipment.equipmentId}>
            <ListItemButton role={undefined} key={equipment.equipmentId} onClick={(e)=>{handleSelected(equipment.equipmentId);console.log(selected);}}>
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
                
            </List>
            {divider}
            <Typography>{description}</Typography>
            {divider}
            {buttons}
        </Box>
     );
}
 
export default InboxDetailedMessage;