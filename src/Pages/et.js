import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useState, useEffect } from "react";
import EnhancedTableHead from "../Component/TableHead";
import EnhancedTableToolbar from "../Component/TableToolbar";
import GetData from "../Functions/GetData";
import axios from "axios";
import UserStatus from "../Component/UserStatus";

const URL = process.env.REACT_APP_FRONTEND_URL + "equipment/qrcode/id=";
function createData(equipmentName, equipmentID, hospital, QRCode) {
  return {
    equipmentName,
    equipmentID,
    hospital,
    QRCode,
  };
}

function createDataThree(equipmentName, equipmentID, QRCode) {
  return {
    equipmentName,
    equipmentID,
    QRCode,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const EquipmentTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [rows, setRows] = useState([]);
  const [changedData, setChangedData] = useState(false);
  const [headCells, setHeadCells] = useState([
    {
      id: "equipmentName",
      disablePadding: true,
      label: "Equipment Name",
    },
    {
      id: "equipmentID",
      disablePadding: false,
      label: "Equipment ID",
    },
    {
      id: "QRCode",
      disablePadding: false,
      label: "QR Code",
    },
  ]);

  useEffect(() => {
    var level = UserStatus.getLevel();
    if (level === 3) {
      setHeadCells([
        {
          id: "equipmentName",
          disablePadding: true,
          label: "Equipment Name",
        },
        {
          id: "equipmentID",
          disablePadding: false,
          label: "Equipment ID",
        },
        {
          id: "hospital",
          disablePadding: false,
          label: "Hospital",
        },
        {
          id: "QRCode",
          disablePadding: false,
          label: "QR Code",
        },
      ]);
      console.log(UserStatus.getTrustId());
      console.log(UserStatus.getHospitalId());
      GetData.getAllEquipmentByTrust(UserStatus.getTrustId()).then((data) => {
        var rowsData = [];
        for (let i = 0; i < data.length; i++) {
          var equipment = data[i];
          rowsData.push(
            createData(
              equipment.name,
              equipment.equipmentId,
              equipment.hospitalId.hospitalName,
              <a href={URL + equipment.equipmentId}>QR code</a>
            )
          );
        }
        setRows(rowsData);
      });
    }
    if (level === 2) {
      GetData.getAllEquipmentByHospital(UserStatus.getHospitalId()).then(
        (data) => {
          var rowsData = [];
          for (let i = 0; i < data.length; i++) {
            var equipment = data[i];
            rowsData.push(
              createDataThree(
                equipment.name,
                equipment.equipmentId,
                <a href={URL + equipment.equipmentId}>QR code</a>
              )
            );
          }
          setRows(rowsData);
        }
      );
    }
    //set trusts' selection option
  }, [changedData]);
  //renders only once for fetching selection options

  const hospitalTag = (row) => {
    if (UserStatus.getLevel() === 3) {
      return <TableCell align="center">{row.hospital}</TableCell>;
    }
    return;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.equipmentName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, equipmentName) => {
    const selectedIndex = selected.indexOf(equipmentName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, equipmentName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = (event, rows, setRows, selected, setSelected) => {
    var rowLs = rows;
    for (let i = 0; i < selected.length; i++) {
      var index = rowLs.indexOf(selected[i]);
      axios.delete(
        process.env.REACT_APP_BACKEND_URL +
          "equipment/delete/id=" +
          rowLs[i].equipmentID
      );
      rowLs.splice(index, 1);
    }
    setRows(rowLs);
    setSelected([]);
  };

  const isSelected = (equipmentName) => selected.indexOf(equipmentName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          handleDelete={handleDelete}
          setSelected={setSelected}
          setRows={setRows}
          rows={rows}
          selected={selected}
          tableTitle={"Equipments"}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 400 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.equipmentName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.equipmentName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.equipmentName}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.equipmentName}
                      </TableCell>
                      <TableCell align="center">{row.equipmentID}</TableCell>
                      {hospitalTag(row)}
                      <TableCell align="center">{row.QRCode}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default EquipmentTable;
