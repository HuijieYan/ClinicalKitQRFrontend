import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {useHistory} from "react-router-dom";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import DeleteData from "../Functions/DeleteData";

const UsergroupTable = () => {
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    const editURL = "http://localhost:3000/editUserGroup/username=";
    //array of indexes of selected rows

    useEffect(()=>{
        const level = parseInt(getLevel());
        console.log(getTrustId());
        console.log(getHospitalId());
        if (level === 2){
            setColumns([
                { name: "name",
                    label: "Group Name",
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
                    label: "Hospital",
                    options: {
                        filterOptions: { fullWidth: true },
                        display: false,
                        viewColumns: false
                    }
                },
                { name: "operation",
                    label: "Edit",
                    options: {
                        filter: false,
                        sort: false,
                    }
                },
                { name: "hospitalId",
                    label: "Hospital ID",
                    options: {
                        filterOptions: { fullWidth: true },
                        display: false,
                        viewColumns: false
                    }
                },
            ]);
            GetData.getAllGroupsByHospital(getHospitalId()).then((data)=>{
               setRowData(data);
            });
        }else if(level === 3){
            GetData.getAllGroupsByTrust(getTrustId()).then((data)=>{
                setRowData(data);
            });
        }
    },[]);
    //renders only once for fetching selection options

    function setRowData(data){
        const rowsData = [];
        for (let i = 0;i<data.length;i++){
            const group = data[i];
            rowsData.push({
                name:group[0],
                username:group[1],
                role:group[2],
                hospital:group[3],
                operation: <a href={editURL+group[1] + "/hospitalId=" + group[4]} style={{textDecoration: "none"}}>Edit</a>,
                hospitalId:group[4]
            });
        }
        setRows(rowsData);
    }

    const [columns,setColumns] = useState([
        { name: "name",
            label: "Group Name",
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
            label: "Hospital",
            options: {
                filterOptions: { fullWidth: true },
                viewColumns: false
            }
        },
        { name: "operation",
            label: "Edit",
            options: {
                filter: false,
                sort: false,
            }
        },
        { name: "hospitalId",
            label: "Hospital ID",
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
            <>
                <Tooltip title={"Add User Group"}>
                    <IconButton onClick={addUserGroup}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </>
        );
    }

    const options = {
        filterType: "multiselect",
        height: "100%",
        jumpToPage: true,
        onRowSelectionChange:function(currentRowsSelected, allRowsSelected, rowsSelected){
            setSelected(rowsSelected);
        },
        onRowsDelete:function(){
            const rowLs = rows;
            for (let i = 0;i<selected.length;i++){
                const index = selected[i];
                DeleteData.deleteUsergroup(rowLs[index].hospitalId,rowLs[index].username);
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