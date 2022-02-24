import Tab from "react-bootstrap/Tab";
import { Tabs } from "react-bootstrap";
import EquipmentReportsTab from "../Component/Report/EquipmentReportsTab";
import React from "react";

const EquipmentReports = () => {
  return (
    <>
      <Tabs defaultActiveKey={"equipment"} className="mb-3">
        <Tab eventKey={"equipment"} title="Equipment Reports">
          <EquipmentReportsTab />
        </Tab>
        <Tab eventKey={"usergroup"} title="UserGroup Reports"></Tab>
      </Tabs>
    </>
  );
};

export default EquipmentReports;
