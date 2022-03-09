import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import DeleteData from "../Functions/DeleteData";

//User Group table display information about user, and corresponding operations

const UsergroupTable = () => {
  //rows of data
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const editURL = process.env.REACT_APP_FRONTEND_URL + "editUserGroup/username=";
  //array of indexes of selected rows

  useEffect(() => {
    const level = parseInt(getLevel());
    if (level === 2) {
      setColumns([
        {
          name: "name",
          label: "Group Name",
          options: {
            filter: false,
          },
        },
        {
          name: "username",
          label: "Username",
          options: {
            filter: false,
          },
        },
        {
          name: "role",
          label: "Role",
          options: {
            filterOptions: { fullWidth: true },
          },
        },
        {
          name: "hospital",
          label: "Hospital",
          options: {
            filter: false,
            display: false,
            viewColumns: false,
          },
        },
        {
          name: "operation",
          label: "Edit",
          options: {
            viewColumns: false,
            filter: false,
          },
        },
        {
          name: "hospitalId",
          label: "Hospital ID",
          options: {
            filter: false,
            display: false,
            viewColumns: false,
          },
        },
      ]);

      GetData.getAllGroupsByHospital(getHospitalId()).then((data) => {
        setRowData(data);
      });
    } else if (level === 3) {
      GetData.getAllGroupsByTrust(getTrustId()).then((data) => {
        setRowData(data);
      });
    }
  }, []);
  //renders only once for fetching selection options

  function setRowData(data) {
    const rowsData = [];
    for (let i = 0; i < data.length; i++) {
      const group = data[i];
      rowsData.push({
        name: group[0],
        username: group[1],
        role: group[2],
        hospital: group[3],
        operation: (
          <a
            href={editURL + group[1] + "/hospitalId=" + group[4]}
            style={{ textDecoration: "none" }}
          >
            Edit
          </a>
        ),
        hospitalId: group[4],
      });
    }
    setRows(rowsData);
  }

  const [columns, setColumns] = useState([
    {
      name: "name",
      label: "Group Name",
      options: {
        filter: false,
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: false,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filterOptions: { fullWidth: true },
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
      name: "operation",
      label: "Edit",
      options: {
        viewColumns: false,
        filter: false,
      },
    },
    {
      name: "hospitalId",
      label: "Hospital ID",
      options: {
        filter: false,
        display: false,
        viewColumns: false,
      },
    },
  ]);

  const history = useHistory();
  const addUserGroup = () => {
    history.push("/editUserGroup");
  };

  const customToolbar = () => {
    return (
      <>
        <Tooltip title={"Add User Group"}>
          <IconButton onClick={addUserGroup}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </>
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
        DeleteData.deleteUsergroup(rowLs[index].hospitalId, rowLs[index].username);
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
        title={"User Groups"}
        data={rows}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default UsergroupTable;
