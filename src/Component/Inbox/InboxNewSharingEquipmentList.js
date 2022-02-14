import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingEquipmentList = () => {

    const getDisplayName=(selection)=>{
        var ls = String(selection).split("\n");
        var name = ls[1];
        return name;
    }

    return ( 
        <InboxNewSharingList getDisplayName={getDisplayName}/>
     );
}
 
export default InboxNewSharingEquipmentList;