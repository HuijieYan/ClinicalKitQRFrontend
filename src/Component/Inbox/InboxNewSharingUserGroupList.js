import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingUserGroupList = () => {

    const getDisplayName=(selection)=>{
        var ls = String(selection).split("\n");
        var name = ls[2];
        return name;
    }

    return ( 
        <InboxNewSharingList getDisplayName={getDisplayName}/>
     );
}
 
export default InboxNewSharingUserGroupList;