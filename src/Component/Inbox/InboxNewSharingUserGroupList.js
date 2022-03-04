import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingUserGroupList = () => {

    const getDisplayName=(selection)=>{
        const ls = String(selection).split("\n");
        //ls[2] is the Display name
        return ls[2];
    }

    return ( 
        <InboxNewSharingList getDisplayName={getDisplayName}/>
     );
}
 
export default InboxNewSharingUserGroupList;