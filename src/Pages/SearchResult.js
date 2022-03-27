import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ArticleIcon from '@mui/icons-material/Article';
import GetData from "../Functions/GetData";
import SearchPage from "./SearchPage";
import {Container} from "react-bootstrap";

/**
 * Search result page for equipment, append below the search bar
 * @memberof module:SearchPage
 * @class SearchResult
 * @param {string} name -name of equipment
 * @param {string} type -type of equipment
 * @param {string} category -category of equipment
 * @param {string} manufacturer -manufacturer of equipment
 * @param {string} model -model name of equipment
 * @constructor
 */
const SearchResult = ({ name, category, type, manufacturer, model }) => {
    const [results,setResults] = useState([]);
    const history = useHistory();

    /**
     * @property {Function} handleOpen - redirect user to the equipment viewing page of selected equipment
     * @param {number} id -equipment id
     */
    const handleOpen= (id) => {
        history.push("/viewEquipment/id="+id);
    }

    useEffect(getSearchResult,[name,category,type,manufacturer,model]);

    /**
     * @property {Function} getSearchResult
     * get search result from backend
     */
    function getSearchResult(){
        GetData.search(name,category,type,manufacturer,model).then((response)=>{
            setResults(response);
        });
    }

    return(
        <Container>
            <SearchPage />
            <List>
                {results.length > 0 ?
                    results.map((equipment, index) => (
                        <ListItem key={index} onClick={()=> {handleOpen(equipment.equipmentId)}} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ArticleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={equipment.name}/>
                            </ListItemButton>
                        </ListItem>
                    )) : "Unable to find matching equipments"}
            </List>
        </Container>
    );
}
 
export default SearchResult;