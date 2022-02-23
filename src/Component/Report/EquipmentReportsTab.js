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
import { Button, Modal } from "react-bootstrap";
import { createGraphDataFromEquipment } from "../../Functions/ReportFunctions";

const EquipmentReportsTab = () => {
  const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  const [rows, setRows] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const viewURL = "http://localhost:3000/viewEquipmentReport/id=";
  const [columns, setColumns] = useState([]);

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

  useEffect(() => {
    setupEquipmentTable();
  }, []);

  useEffect(() => {
    // rerenders when dates or equipment selection changes
    if (selectedEquipment.length > 0) {
      GetData.getViewingsByEquipmentId(rows[selectedEquipment[0]].id).then(
        (data) => {
          console.log(data);
          createGraphDataFromEquipment(data);
        }
      );
    }
  }, [selectedEquipment, startDate, endDate]);

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

  return (
    <>
      <div className="tableActions mb-3">
        <Button onClick={() => setModalShow(true)}>Select Equipment</Button>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(newDate) => {
              setStartDate(newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
            maxDate={endDate === null ? null : endDate}
          />
          <Button className="btn-close"></Button>
          <DatePicker
            label="End Date"
            inputFormat="dd/MM/yyyy"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
            minDate={startDate === null ? null : startDate}
          />
        </LocalizationProvider>
      </div>

      <div className="graphs"></div>

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
