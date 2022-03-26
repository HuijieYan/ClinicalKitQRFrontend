import {Tabs, Tab, Container} from "react-bootstrap";
import EquipmentReportsTab from "../Component/Report/EquipmentReportsTab";

/**
 * Layout for Equipment report page, detailed report components is in the EquipmentReportsTab
 * @module EquipmentReports
 */
const EquipmentReports = () => {
  return (
      <Container style={{maxWidth: '100%'}}>
          <Tabs defaultActiveKey={"equipment"} className="mb-3">
              <Tab eventKey={"equipment"} title="Equipment Reports">
                  <EquipmentReportsTab />
              </Tab>
          </Tabs>
      </Container>
  );
};

export default EquipmentReports;
