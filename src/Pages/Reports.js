import { Tabs, Tab } from "react-bootstrap";
import EquipmentReportsTab from "../Component/Report/EquipmentReportsTab";
import React from "react";

const EquipmentReports = () => {
  return (
    <>
      <Tabs defaultActiveKey={"equipment"} className="mb-3">
        <Tab eventKey={"equipment"} title="Equipment Reports">
          <EquipmentReportsTab />
        </Tab>
      </Tabs>
    </>
  );
};

export default EquipmentReports;
