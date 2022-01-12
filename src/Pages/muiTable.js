import MUIDataTable, { TableToolbar } from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import UserStatus from "../Component/UserStatus";
import GetData from "../Functions/GetData";

const EquipmentTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const URL = "http://localhost:3000/equipment/qrcode/id=";
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows

    useEffect(()=>{
        var level = UserStatus.getLevel();
        console.log(UserStatus.getTrustId());
        console.log(UserStatus.getHospitalId());
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
            ])
        }
        GetData.getAllEquipmentByTrust(UserStatus.getTrustId()).then((data)=>{
            var rowsData = [];
            for (let i = 0;i<data.length;i++){
                var equipment = data[i];
                rowsData.push({name:equipment.name,id:equipment.equipmentId,hospital:equipment.hospitalId.hospitalName,qr:<a href={URL+equipment.equipmentId}>QR code</a>});
            }
            setRows(rowsData);
        })
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

    const options = {
        filterType: "multiselect",
        tableBodyHeight,
        jumpToPage: true,
        onRowSelectionChange:function(currentRowsSelected, allRowsSelected, rowsSelected){
            setSelected(rowsSelected);
        },
        onRowsDelete:function(){
            var rowLs = rows;
            for (let i = 0;i<selected.length;i++){
                var index = selected[i];
                console.log("http://localhost:8080/equipment/delete/id="+rowLs[index].id)
                axios.delete("http://localhost:8080/equipment/delete/id="+rowLs[index].id);
                rowLs.splice(index,1);
            }
            setRows(rowLs);
            setSelected([]);
            return true;
        },
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
