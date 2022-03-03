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

const EquipmentTable = () => {
  const QRURL = process.env.REACT_APP_FRONTEND_URL + "equipment/qrcode/id=";
  const viewURL = process.env.REACT_APP_FRONTEND_URL + "viewEquipment/id=";
  const editURL = process.env.REACT_APP_FRONTEND_URL + "editEquipment/id=";
  const [rows, setRows] = useState([]);
  //rows of data
  const [selected, setSelected] = useState([]);
  //array of indexes of selected rows

  useEffect(() => {
    const level = parseInt(getLevel());
    console.log(getTrustId());
    console.log(getHospitalId());
    if (level === 2) {
      setColumns([
        {
          name: "name",
          label: "Equipment Name",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },
        {
          name: "id",
          label: "Equipment ID",
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
        {
          name: "qr",
          label: "QR Code",
          options: {
            filterOptions: { fullWidth: true },
            viewColumns: false,
          },
        },
        {
          name: "operation",
          label: "Operation",
          options: {
            filter: false,
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

    //set trusts' selection option
  }, []);
  //renders only once for fetching selection options

  function setRowData(data) {
    const rowsData = [];
    for (let i = 0; i < data.length; i++) {
      const equipment = data[i];
      rowsData.push({
        name: (
          <a
            href={viewURL + equipment.equipmentId}
            style={{ textDecoration: "none" }}
          >
            {equipment.name}
          </a>
        ),
        id: equipment.equipmentId,
        hospital: equipment.hospitalId.hospitalName,
        qr: <a href={QRURL + equipment.equipmentId}>QR code</a>,
        operation: (
          <a
            href={editURL + equipment.equipmentId}
            style={{ textDecoration: "none" }}
          >
            Edit
          </a>
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
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "id",
      label: "Equipment ID",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "hospital",
      label: "Hospital",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "qr",
      label: "QR Code",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "operation",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
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
        const index = selected[i];
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
