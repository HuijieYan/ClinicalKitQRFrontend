import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ArticleIcon from '@mui/icons-material/Article';
import GetData from "../Functions/GetData";
import SearchPage from "./SearchPage";

const SearchResult = ({name,category,type}) => {
    const [results,setResults] = useState([]);
    const history = useHistory();

    const handleOpen=(id)=>{
        history.push("/viewEquipment/id="+id);
    }

    useEffect(()=>{
        GetData.searchByName(name,category,type).then((response)=>{
            setResults(response);
        });
    },[]);

    return ( 
        <>
        <SearchPage />
        <List>
                {results.length>0?
                    results.map((equipment)=>{
                    return(
                        <ListItem key={equipment.id} secondaryAction={
                            <Button edge="end" onClick={(e)=>{handleOpen(equipment.equipmentId)}}>OPEN</Button>
                        } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ArticleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={equipment.name}/>
                            </ListItemButton>
                        </ListItem>
                    );
                }):"Unable to find matching equipments"}
        </List>
        </>
     );
}
 
export default SearchResult;