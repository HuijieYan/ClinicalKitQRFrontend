import InboxSideBar from "../Component/Inbox/InboxSideBar";
import {Box} from "@mui/system";

const Inbox = () => {
    return (
        <Box sx={{display: 'flex', borderStyle: 'solid', borderWidth: '1px', height: '600px', margin: '1%'}}>
            <InboxSideBar/>
        </Box>
         );
}
 
export default Inbox;