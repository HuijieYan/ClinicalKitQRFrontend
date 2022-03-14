import { Box } from "@mui/system";
import { Button, Checkbox, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleIcon from '@mui/icons-material/Article';
import InboxButtonList from "./InboxButtonList";
import { useHistory } from "react-router-dom";
import DeleteData from "../../Functions/DeleteData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeMailData } from "../../Storage/Actions/actions";

const InboxDetailedMessage = ({option,index,vacant,display}) => {
    
    const history = useHistory();
    const data = useSelector((state)=>state);
    const dispatch = useDispatch();

    const [equipments,setEquipments] = useState([]);
    const [description,setDescription] = useState("Select An Sharing");
    const [title,setTitle] = useState("");
    const [id,setId] = useState("");

    const[divider,setDivider] = useState(null);
    const[buttons,setButtons] = useState(false);
    const[selected,setSelected] = useState([]);

    const handleDelete=(id)=>{
        DeleteData.deleteMail(id);
        const ls = [...data];
        ls.splice(index,1);
        dispatch(storeMailData(ls));
    }

    const handleOpen=(id)=>{
        history.push("/previewEquipment/id="+id);
    }

    const handleSelected = (id,saved) => () =>{
        if (saved){
        //if the equipment has already been saved, do nothing
            return;
        }
        const index = selected.indexOf(id);
        const list = [...selected];

        if (index === -1){
            list.push(id);    
        }else{
            list.splice(index,1);
        }
        setSelected(list);
    }

    useEffect(()=>{
        function rendering(){
            if(vacant||index>=data.length){
                setTitle("");
                setDescription("Select a Sharing");
                setEquipments([]);
                setDivider(null);
                setButtons(false);
                setId("");
            //if this area is vacant or displaying a data which does not exist,
            //display select a sharing
            }else{
                const line = data[Number(index)];
                const mail = line[0];
                setTitle(mail.title);
                setDescription(mail.description);
                setEquipments(mail.equipments);
                setId(mail.id);
                setDivider(<Divider/>);
                setButtons(true);
            }
        }
        
        rendering();
    },[vacant,index,data]);

    if (display){
        return ( 
            <Box sx={{width: '1', padding: '1%', overflow: 'scroll', paddingTop: '2%'}}>
                <Typography style={{marginBottom: '1%'}}>{title}</Typography>
                {divider}
                <List>
                {
                    equipments.map((equipment,index)=>{
                    return(
                        <ListItem key={equipment.id} secondaryAction={
                            <Button edge="end" onClick={()=>{handleOpen(equipment.id)}}>OPEN</Button>
                        } disablePadding>
                            <ListItemButton onClick={handleSelected(index,equipment.saved)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={selected.indexOf(index) !== -1||equipment.saved}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        disabled={equipment.saved}
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
                {Number(option)===0&&buttons && (
                    <div style={{margin: '2%'}}>
                        <InboxButtonList selected={selected} setSelected={setSelected} currentMailIndex={index}/>
                        <span style={{marginLeft: '3%', marginRight: '3%'}}/>
                        <Button onClick={()=>{handleDelete(id)}}>Delete This Sharing</Button>
                    </div>
                )}
                {Number(option)===1&&buttons && (
                        <Button onClick={()=>{handleDelete(id)}}>Delete This Sharing</Button>
                )}
            </Box>
         );
    }else{
        return null;
    }
    
}
 
export default InboxDetailedMessage;