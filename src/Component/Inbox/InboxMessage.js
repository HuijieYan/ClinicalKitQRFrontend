import { useState } from "react";
import { useEffect } from "react";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../../Functions/UserStatus";
import InboxMessageList from "./InboxMessageList";
import InboxSideBar from "./InboxSideBar";

const InboxMessage = ({ selected, clicked }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selected === 0) {
      GetData.getReceivedSharings(getHospitalId(), getUserName()).then(
        (data) => {
          setData(data);
        }
      );
    } else {
      GetData.getSentSharings(getHospitalId(), getUserName()).then((data) => {
        setData(data);
      });
    }
  }, [selected]);

  return (
    <>
      <InboxMessageList data={data} selected={selected} clicked={clicked} />
    </>
  );
};

export default InboxMessage;
