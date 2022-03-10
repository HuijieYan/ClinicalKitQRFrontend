import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../../Functions/GetData";
import {
  getHospitalId,
  getLevel,
  getTrustId,
} from "../../Functions/UserStatus";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Button, Modal, Row, Col, Tabs, Tab } from "react-bootstrap";
import { createGraphData } from "../../Functions/ReportFunctions";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { Typography } from "@mui/material";

const EquipmentReportsTab = () => {
  const [tableBodyHeight] = useState("100%");
  const [rows, setRows] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [columns, setColumns] = useState([]);
  const emptyGraph = {
    datasets: [{ data: [], label: "", backgroundColor: [] }],
    labels: [],
  };
  const [graphData, setGraphData] = useState({
    ...emptyGraph,
  });

  function setupEquipmentTable() {
    const level = parseInt(getLevel());
    if (level === 2) {
      // if user is a hospital admin
      setColumns([
        {
          name: "id",
          label: "Equipment ID",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },
        {
          name: "name",
          label: "Equipment Name",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },

        {
          name: "hospital",
          options: {
            filterOptions: { fullWidth: true },
            display: false,
            viewColumns: false,
          },
        },
      ]);
      GetData.getAllEquipmentByHospital(getHospitalId()).then((data) => {
        const rowsData = [];
        for (let i = 0; i < data.length; i++) {
          const equipment = data[i];
          rowsData.push({
            name: equipment.name,
            id: equipment.equipmentId,
            hospital: equipment.hospitalId.hospitalName,
          });
        }
        setRows(rowsData);
      });
    } else if (level === 3) {
      // if user is a trust admin (this displays the hospital in the table)

      setColumns([
        {
          name: "id",
          label: "Equipment ID",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },
        {
          name: "name",
          label: "Equipment Name",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },

        {
          name: "hospital",
          options: {
            filterOptions: { fullWidth: true },
            display: true,
            viewColumns: false,
          },
        },
      ]);

      GetData.getAllEquipmentByTrust(getTrustId()).then((data) => {
        const rowsData = [];
        for (let i = 0; i < data.length; i++) {
          const equipment = data[i];
          rowsData.push({
            name: equipment.name,
            id: equipment.equipmentId,
            hospital: equipment.hospitalId.hospitalName,
          });
        }
        setRows(rowsData);
      });
    }
  }

  const options = {
    filterType: "checkbox",
    selectableRows: "single",
    tableBodyHeight,
    jumpToPage: true,
    search: true,
    download: false,
    print: false,
    delete: false,
    selectToolbarPlacement: "none",
    rowsSelected: selectedEquipment,
    onRowSelectionChange: function (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) {
      setSelectedEquipment(rowsSelected);
    },
    customToolbarSelect: () => {},
  };

  useEffect(() => {
    setupEquipmentTable();
  }, []);

  useEffect(() => {
    // rerenders when dates or equipment selection changes
    if (selectedEquipment.length === 0) {
      setGraphData({ ...emptyGraph });
    }
    if (selectedEquipment.length > 0) {
      GetData.getViewingsByEquipmentIdAndDateBetween(
        rows[selectedEquipment[0]].id,
        startDate,
        endDate
      ).then((data) => {
        setGraphData(createGraphData(rows[selectedEquipment[0]].name, data));
      });
    }
  }, [selectedEquipment, startDate, endDate]);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Button onClick={() => setModalShow(true)}>Select Equipment</Button>
        </Col>
        <Col>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              inputFormat="dd/MM/yyyy"
              value={startDate}
              onChange={(newDate) => {
                setStartDate(newDate);
              }}
              renderInput={(params) => <TextField {...params}/>}
              maxDate={endDate === null ? null : endDate}
            />
            <Button
            onClick={() => setStartDate(null)}
            className="btn-close"
            />
            <DatePicker
              label="End Date"
              inputFormat="dd/MM/yyyy"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              renderInput={(params) => <TextField {...params} />}
              maxDate={new Date()}
              minDate={startDate === null ? null : startDate}
            />
            <Button
              onClick={() => setEndDate(null)}
              className="btn-close"
            />
          </LocalizationProvider>
        </Col>
      </Row>
      <Tabs defaultActiveKey={"barChart"}>
        <Tab eventKey={"barChart"} title="Bar Chart">
          {graphData.datasets[0].data.length !== 0 ? (
            <BarChart data={graphData} />
          ):<Typography>No data found on the selected date of this equipment</Typography>}
        </Tab>
        <Tab eventKey={"pieChart"} title="Pie Chart">
          {graphData.datasets[0].data.length !== 0 ? (
            <PieChart data={graphData} />
          ):<Typography>No data found on the selected date of this equipment</Typography>}
        </Tab>
      </Tabs>

      {/* Hidden elements */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        scrollable={true}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Select Equipment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ThemeProvider theme={createTheme()}>
            <MUIDataTable
              title={"Equipment"}
              data={rows}
              columns={columns}
              options={options}
              className="mb-3"
            />
          </ThemeProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EquipmentReportsTab;
