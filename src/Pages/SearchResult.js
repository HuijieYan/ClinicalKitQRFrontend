import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ArticleIcon from '@mui/icons-material/Article';
import GetData from "../Functions/GetData";
import SearchPage from "./SearchPage";

//Search Results append to the search page

const SearchResult = ({name,category,type,manufacturer,model}) => {
    const [results,setResults] = useState([]);
    const history = useHistory();

    const handleOpen=(id)=>{
        history.push("/viewEquipment/id="+id);
    }

    useEffect(()=>{
        GetData.search(name,category,type,manufacturer,model).then((response)=>{
            setResults(response);
        });
    },[name,category,type,manufacturer,model]);

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