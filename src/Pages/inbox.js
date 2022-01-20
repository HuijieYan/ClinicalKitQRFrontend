import InboxMessage from "../Component/Inbox/InboxMessage";
import InboxSideBar from "../Component/Inbox/InboxSideBar";

const Inbox = () => {
    return ( 
        <div>
            <InboxSideBar/>
            <InboxMessage/>
        </div>
         );
}
 
export default Inbox;