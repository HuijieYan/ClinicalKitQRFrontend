import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingEquipmentList = () => {
  const getDisplayName = (selection) => {
    const ls = String(selection).split("\n");
    const name = ls[1];
    return name;
  };

  return <InboxNewSharingList getDisplayName={getDisplayName} />;
};

export default InboxNewSharingEquipmentList;
