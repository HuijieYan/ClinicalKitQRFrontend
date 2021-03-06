import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { storeSelection } from "../../Storage/Actions/actions";

const InboxNewSharingList = ({getDisplayName}) => {
    const selections = useSelector((state)=>state);
    const dispatch = useDispatch();
    const handleDelete=(selection)=>{
        const ls = [...selections];
        const index = ls.indexOf(selection);
        ls.splice(index,1);
        dispatch(storeSelection(ls));
    }

    return ( 
        <div>
        {[...selections].map((selection, index)=>{
            const name = getDisplayName(selection);

            return(
                    <ListItem key={index}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ArticleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={name}/>
                        </ListItemButton>
                        <IconButton onClick={(e)=>{handleDelete(selection)}}><DeleteIcon/></IconButton>
                    </ListItem>
                );
            })
        }
        </div>
     );
}
 
export default InboxNewSharingList;