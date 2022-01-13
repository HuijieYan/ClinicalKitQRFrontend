import MUIDataTable, { TableToolbar } from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import UserStatus from "../Component/UserStatus";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import {useHistory} from "react-router-dom";

const UsergroupTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows

    useEffect(()=>{
        const level = UserStatus.getLevel();
        console.log(UserStatus.getTrustId());
        console.log(UserStatus.getHospitalId());
        if (level === 2){
            setColumns([
                { name: "name",
                    label: "Name",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "username",
                    label: "Username",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "role",
                    label: "Role",
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
                { name: "hospitalId",
                    options: {
                        filterOptions: { fullWidth: true },
                        display: false,
                        viewColumns: false
                    }
                },
            ]);
            GetData.getAllGroupsByHospital(UserStatus.getHospitalId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const group = data[i];
                    rowsData.push({name:group[0],username:group[1],role:group[2],hospital:group[3],hospitalId:group[4]});
                }
                setRows(rowsData);
            });
        }else if(level === 3){
            GetData.getAllGroupsByTrust(UserStatus.getTrustId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const group = data[i];
                    console.log(group);
                    rowsData.push({name:group[0],username:group[1],role:group[2],hospital:group[3],hospitalId:group[4]});
                }
                setRows(rowsData);
            });
        }
    },[]);
    //renders only once for fetching selection options

    const [columns,setColumns] = useState([
        { name: "name",
            label: "User Group Name",
            options: {
                filterOptions: { fullWidth: true },
                viewColumns: false
            }
        },
        { name: "username",
            label: "Username",
            options: {
                filterOptions: { fullWidth: true },
                viewColumns: false
            }
        },
        { name: "role",
            label: "Role",
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
        { name: "hospitalId",
            options: {
                filterOptions: { fullWidth: true },
                display: false,
                viewColumns: false
            }
        },
    ]);

    const history = useHistory();
    const addUserGroup = () => {
        history.push("/editUserGroup");
    }

    const customToolbar = () => {
        return(
            <div>
            <Tooltip title={"Add User Group"}>
                <IconButton onClick={addUserGroup}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Add Hospital"}>
            <IconButton onClick={addUserGroup}>
                <AddBusinessIcon/>
            </IconButton>
            </Tooltip>
        </div>
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
                console.log("http://localhost:8080/usergroup/delete/hospitalId="+rowLs[index].hospitalId+" username="+rowLs[index].username);
                axios.delete("http://localhost:8080/usergroup/delete/hospitalId="+rowLs[index].hospitalId+" username="+rowLs[index].username);
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
                title={"User Groups"}
                data={rows}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}

export default UsergroupTable;