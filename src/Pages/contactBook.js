import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import { IconButton, Tooltip } from "@mui/material";
import { getUserName } from "../Functions/UserStatus";
import { ImShare } from "react-icons/im";

const ContactBook = () => {
  const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  //array of indexes of selected rows

  useEffect(() => {
    GetData.getAllAdmins().then((data) => {
      const rowsData = [];
      const username = getUserName();
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        const group = data[i];
        if (group[5] !== username) {
          rowsData.push({
            name: group[0],
            hospital: group[1],
            role: group[2],
            hospitalId: group[3],
            email: group[4],
            share: (
              <Tooltip title={"Share Equipment"}>
                <IconButton>
                  <ImShare />
                </IconButton>
              </Tooltip>
            ),
          });
        }
        //decoding issue's json
      }
      setRows(rowsData);
    });
  }, []);
  //renders only once for fetching selection options

  function handleCheck(e) {
    console.log(e.target.name);
    GetData.setIssueSolved(e.target.name, e.target.checked);
  }

  const [columns, setColumns] = useState([
    {
      name: "name",
      label: "Name",
      options: {
        filterOptions: { fullWidth: true },
        display: false,
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
      name: "role",
      label: "Role",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "email",
      label: "email",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
    {
      name: "hospitalId",
      options: {
        filterOptions: { fullWidth: true },
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "share",
      label: "share",
      options: {
        filterOptions: { fullWidth: true },
        viewColumns: false,
      },
    },
  ]);

  const options = {
    tableBodyHeight,
    jumpToPage: true,
    selectableRows: "none",
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <MUIDataTable
        title={"Contact Book"}
        data={rows}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
};

export default ContactBook;
