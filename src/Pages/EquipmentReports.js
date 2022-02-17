import MUIDataTable, { TableToolbar } from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import GetData from "../Functions/GetData";
import { Checkbox } from "@mui/material";
import {useHistory} from "react-router-dom";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import DeleteData from "../Functions/DeleteData";

const EquipmentReports = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const [rows,setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows
    const[solvedLs,setSolvedLs] = useState([]);
    const viewURL = "http://localhost:3000/viewEquipment/id=";

    useEffect(()=>{
        const level = parseInt(getLevel());
        const solved = [];
        console.log(getTrustId());
        console.log(getHospitalId());
        if (level === 2){
            setColumns([
                { name: "name",
                    label: "Equipment Name",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "id",
                    label: "Equipment ID",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "hospital",
                    options: {
                        filterOptions: { fullWidth: true },
                        display: false,
                        viewColumns: false
                    }
                }
            ]);
            GetData.getAllEquipmentByHospital(getHospitalId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const equipment = data[i];
                    rowsData.push({
                        name: <a href={viewURL+equipment.equipmentId} style={{textDecoration: "none"}}>{equipment.name}</a>,
                        id: equipment.equipmentId,
                        hospital: equipment.hospitalId.hospitalName,
                    });
                }
                setRows(rowsData);
            });
        }else if(level === 3){
            GetData.getAllEquipmentByTrust(getTrustId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const equipment = data[i];
                    rowsData.push({
                        name:<a href={viewURL+equipment.equipmentId} style={{textDecoration: "none"}}>{equipment.name}</a>,
                        id:equipment.equipmentId,
                        hospital:equipment.hospitalId.hospitalName,
                    });
                }
                setRows(rowsData);
            });
        }
    },[]);
    //renders only once for fetching selection options

    function handleCheck(e){
        console.log(e.target.name); 
        GetData.setIssueSolved(e.target.name,e.target.checked);

    }

    const [columns,setColumns] = useState([
        { name: "name",
        label: "Equipment Name",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
    { name: "id",
        label: "Equipment ID",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
    { name: "hospital",
        label: "Hospital",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    }
    ]);

    const history = useHistory();

    const options = {
        filterType: "multiselect",
        tableBodyHeight,
        jumpToPage: true,
        onRowSelectionChange:function(currentRowsSelected, allRowsSelected, rowsSelected){
            setSelected(rowsSelected);
        },
        onRowsDelete:function(){
            const rowLs = rows;
            for (let i = 0;i<selected.length;i++){
                const index = selected[i];
                DeleteData.deleteIssue(rowLs[index]);
                rowLs.splice(index,1);
                solvedLs.splice(index,1);
            }
            setRows(rowLs);
            setSelected([]);
            setSolvedLs(solvedLs);
            return true;
        },
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <MUIDataTable
                title={"Equipment Reports"}
                data={rows}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}

export default EquipmentReports;