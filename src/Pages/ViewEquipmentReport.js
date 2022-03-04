import GetData from "../Functions/GetData";
import React, { useEffect, useState } from "react";

//Equipment Report view page by id

const ViewEquipmentReport = (id) => {
  const [viewingData, setViewingData] = useState("");

  function getViewings(equipmentId) {
    GetData.getViewingsByEquipmentId(equipmentId).then((data) => {
      setViewingData(JSON.stringify(data));
    });
  }

  useEffect(() => {
    getViewings(id);
  });

  return (
    <>
      <p>{viewingData}</p>
    </>
  );
};

export default ViewEquipmentReport;
