import GetData from "../Functions/GetData";
import React, { useEffect, useState } from "react";
import PieChart from "../Component/Report/PieChart";
import BarChart from "../Component/Report/BarChart";

const ViewEquipmentReport = (props) => {
  const [viewingData, setViewingData] = useState("");
  const equipmentId = props.id;

  function getViewings(equipmentId) {
    GetData.getViewingsByEquipmentId(equipmentId).then((data) => {
      setViewingData(JSON.stringify(data));
      console.log(data);
    });
  }

  useEffect(() => {
    console.log(equipmentId);
    getViewings(equipmentId);
  });

  return (
    <>
      <p>{viewingData}</p>
    </>
  );
};

export default ViewEquipmentReport;
