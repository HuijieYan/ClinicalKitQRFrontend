import InboxNewSharingList from "./InboxNewSharingList";

const InboxNewSharingUserGroupList = () => {
  const getDisplayName = (selection) => {
    const ls = String(selection).split("\n");
    const name = ls[2];
    return name;
  };

  return <InboxNewSharingList getDisplayName={getDisplayName} />;
};

export default InboxNewSharingUserGroupList;
