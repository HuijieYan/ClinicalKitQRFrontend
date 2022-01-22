import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const InboxDetailedMessage = ({title,description,vacant}) => {
    const[divider,setDivider] = useState(null);
    
    useEffect(()=>{
        if(vacant){
            setDivider(null);
        }else{
            setDivider(<Divider/>);
        }
    },[vacant]);


    return ( 
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography>{title}</Typography>
            {divider}
            <Typography>{description}</Typography>
        </Box>
     );
}
 
export default InboxDetailedMessage;