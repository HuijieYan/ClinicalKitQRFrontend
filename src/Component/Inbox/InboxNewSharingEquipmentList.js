import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingEquipmentList = () => {

    const getDisplayName=(selection)=>{
        const ls = String(selection).split("\n");
        //ls[1] is the Display name
        return ls[1];
    }

    return ( 
        <InboxNewSharingList getDisplayName={getDisplayName}/>
     );
}
 
export default InboxNewSharingEquipmentList;