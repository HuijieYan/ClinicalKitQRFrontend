import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import { getHospitalId, getLevel, getTrustId } from "../Component/UserStatus";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import {useHistory} from "react-router-dom";

const EquipmentTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const URL = "http://localhost:3000/equipment/qrcode/id=";
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows

    useEffect(()=>{
        var level = parseInt(getLevel());
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
                },
                { name: "qr",
                    label: "QR Code",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
            ]);
            GetData.getAllEquipmentByHospital(getHospitalId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const equipment = data[i];
                    rowsData.push({
                        name:equipment.name,
                        id:equipment.equipmentId,
                        hospital:equipment.hospitalId.hospitalName,
                        qr:<a href={URL+equipment.equipmentId}>QR code</a>
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
                        name:equipment.name,
                        id:equipment.equipmentId,
                        hospital:equipment.hospitalId.hospitalName,
                        qr:<a href={URL+equipment.equipmentId}>QR code</a>
                    });
                }
                setRows(rowsData);
            });
        }
        
        //set trusts' selection option
    },[]);
    //renders only once for fetching selection options

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
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "qr",
                    label: "QR Code",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
    ]);

    const history = useHistory();
    const addEquipment = () => {
        history.push("/editEquipment")
    }

    const customToolbar = () => {
        return(
            <Tooltip title={"Add New Equipment"}>
                <IconButton onClick={addEquipment}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        );
    }

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
                console.log("http://localhost:8080/equipment/delete/id="+rowLs[index].id)
                axios.delete("http://localhost:8080/equipment/delete/id="+rowLs[index].id);
                rowLs.splice(index,1);
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
}

export default EquipmentTable;
