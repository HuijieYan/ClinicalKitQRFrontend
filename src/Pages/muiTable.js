import MUIDataTable, { TableToolbar } from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import UserStatus from "../Component/UserStatus";
import GetData from "../Functions/GetData";

const EquipmentTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const URL = "http://localhost:3000/equipment/qrcode/id=";
    const [rows,setRows] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(()=>{
        var level = UserStatus.getLevel();
        console.log(UserStatus.getTrustId());
        console.log(UserStatus.getHospitalId());
        if (level === 3){
            GetData.getAllEquipmentByTrust(UserStatus.getTrustId()).then((data)=>{
                var rowsData = [];
                for (let i = 0;i<data.length;i++){
                    var equipment = data[i];
                    rowsData.push([equipment.name,equipment.equipmentId,equipment.hospitalId.hospitalName,<a href={URL+equipment.equipmentId}>QR code</a>]);
                }
                setRows(rowsData);
            })
        }
        if (level === 2){
            setColumns([
                "Equipment Name",
                "Equipment ID",
                { name: "hospital",
                    options: {
                        filterOptions: { fullWidth: true },
                        display: false,
                        viewColumns: false
                    }
                },
                "QR Code",
            ])
            GetData.getAllEquipmentByHospital(UserStatus.getHospitalId()).then((data)=>{
                var rowsData = [];
                for (let i = 0;i<data.length;i++){
                    var equipment = data[i];
                    rowsData.push([equipment.name,equipment.equipmentId,equipment.hospitalId.hospitalName,<a href={URL+equipment.equipmentId}>QR code</a>]);
                }
                setRows(rowsData);
            })
        }
        //set trusts' selection option
    },[]);
    //renders only once for fetching selection options

    const [columns,setColumns] = useState([
        "Equipment Name",
        "Equipment ID",
        "hospital",
        "QR Code",
    ]);

    const options = {
        filterType: "multiselect",
        tableBodyHeight,
        jumpToPage: true,
        onRowSelectionChange:function(currentRowsSelected, allRowsSelected, rowsSelected){
            setSelected(allRowsSelected);
        }
    };
    
    

    const handleDelete = (event,rows,setRows, selected,setSelected) =>{
        var rowLs = rows;
        for (let i = 0;i<selected.length;i++){
            var index = rowLs.indexOf(selected[i]);
            axios.delete("http://localhost:8080/equipment/delete/id="+rowLs[i].equipmentID);
            rowLs.splice(index,1);
        }
        setRows(rowLs);
        setSelected([]);
    }


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
