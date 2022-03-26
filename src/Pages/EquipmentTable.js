import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import DeleteData from "../Functions/DeleteData";

/**
 * Equipment Table is a table contains equipments data and it's corresponding operations
 * @module EquipmentTable
 */

/**
 * @constructor
 */
const EquipmentTable = () => {
  const QRURL = process.env.REACT_APP_FRONTEND_URL + "equipment/qrcode/id=";
  const viewURL = process.env.REACT_APP_FRONTEND_URL + "viewEquipment/id=";
  const editURL = process.env.REACT_APP_FRONTEND_URL + "editEquipment/id=";
  const [rows, setRows] = useState([]);
  //rows of data
  const [selected, setSelected] = useState([]);
  //array of indexes of selected rows

  useEffect(initializeEquipments, []);

  /**
   * @property {Function} initializeEquipments
   * render only once, get all equipment data from backend of a hospital or all hospitals in a trust,
   * also set the columns settings
   */
  function initializeEquipments(){
    const level = parseInt(getLevel());
    if (level === 2) {
      setColumns([
        {
          name: "name",
          label: "Equipment Name",
          options: {
            filter: false,
          },
        },
        {
          name: "id",
          label: "Equipment ID",
          options: {
            filter: false,
          },
        },
        {
          name: "hospital",
          options: {
            filter: false,
            display: false,
            viewColumns: false,
          },
        },
        {
          name: "qr",
          label: "QR Code",
          options: {
            filter: false,
            sort: false,
            viewColumns: false,
          },
        },
        {
          name: "operation",
          label: "Operation",
          options: {
            filter: false,
            sort: false,
            viewColumns: false,
          },
        },
      ]);

      GetData.getAllEquipmentByHospital(getHospitalId()).then((data) => {
        setRowData(data);
      });
    } else if (level === 3) {
      GetData.getAllEquipmentByTrust(getTrustId()).then((data) => {
        setRowData(data);
      });
    }
  }

  /**
   * @property {Function} setRowData -initialize row data for every equipment
   * @param {array<Object>} data -array of equipment
   */
  function setRowData(data) {
    const rowsData = [];
    for (let i = 0; i < data.length; i++) {
      const equipment = data[i];
      rowsData.push({
        name: equipment.name,
        id: equipment.equipmentId,
        hospital: equipment.hospitalId.hospitalName,
        qr: <a href={QRURL + equipment.equipmentId}>QR code</a>,
        operation: (
            <>
              <a
                  href={viewURL + equipment.equipmentId}
                  style={{ textDecoration: "none", marginRight: '8%'}}
              >
                View
              </a>
              <a
                href={editURL + equipment.equipmentId}
                style={{ textDecoration: "none" }}
              >
                Edit
              </a>
            </>
        ),
      });
    }
    setRows(rowsData);
  }

  const [columns, setColumns] = useState([
    {
      name: "name",
      label: "Equipment Name",
      options: {
        filter: false,
      },
    },
    {
      name: "id",
      label: "Equipment ID",
      options: {
        filter: false,
      },
    },
    {
      name: "hospital",
      label: "Hospital",
      options: {
        filterOptions: { fullWidth: true },
      },
    },
    {
      name: "qr",
      label: "QR Code",
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: "operation",
      label: "Operation",
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
  ]);

  const history = useHistory();
  const addEquipment = () => {
    history.push("/editEquipment");
  };

  const customToolbar = () => {
    return (
      <Tooltip title={"Add New Equipment"}>
        <IconButton onClick={addEquipment}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const options = {
    filterType: "multiselect",
    height: "100%",
    jumpToPage: true,
    onRowSelectionChange: function (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) {
      setSelected(rowsSelected);
    },
    onRowsDelete: function () {
      const rowLs = rows;
      for (let i = 0; i < selected.length; i++) {
        const index = selected[i] - i;
        DeleteData.deleteEquipment(rowLs[index].id);
        rowLs.splice(index, 1);
      }
      setRows(rowLs);
      setSelected([]);
      return true;
    },
    customToolbar: customToolbar,
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        title={"Equipments"}
        data={rows}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default EquipmentTable;
