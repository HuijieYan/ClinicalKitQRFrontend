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

const IssueTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows
    const[solvedLs,setSolvedLs] = useState([]);

    useEffect(()=>{
        var level = parseInt(getLevel());
        const solved = [];
        console.log(getTrustId());
        console.log(getHospitalId());
        if (level === 2){
            setColumns([
                { name: "id",
                label: "Issue ID",
                options: {
                    filterOptions: { fullWidth: true },
                    display: false,
                    viewColumns: false
                }
                },
                { name: "date",
                    label: "Date",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "description",
                    label: "Description",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "equipment",
                    label: "Equipment",
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
                { name: "usergroup",
                  label: "User Group",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
                { name: "solved",
                  label: "Solved",
                    options: {
                        filterOptions: { fullWidth: true },
                        viewColumns: false
                    }
                },
            ]);
            GetData.getAllIssuesByHospital(getHospitalId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    const issue = data[i];
                    solved.push(issue.solved);
                    setSolvedLs(solved);
                    rowsData.push({id:issue.issueId,date:issue.date,description:issue.description,equipment:issue.equipmentId.name,
                        hospital:issue.userGroupName.hospitalId.hospitalName,usergroup:issue.userGroupName.name,
                        solved:<Checkbox color="success" checked={solvedLs[i]} onChange={(e)=>{handleCheck(e)}} name={String(issue.issueId)}/>});
                    //decoding issue's json
                }
                setRows(rowsData);
                
            });
        }else if(level === 3){
            GetData.getAllIssuesByTrust(getTrustId()).then((data)=>{
                const rowsData = [];
                for (let i = 0;i<data.length;i++){
                    var issue = data[i];
                    console.log(issue);
                    console.log(issue.equipmentId.name);
                    solved.push(issue.solved);
                    setSolvedLs(solved);
                    rowsData.push({id:issue.issueId,date:issue.date,description:issue.description,equipment:issue.equipmentId.name,
                        hospital:issue.userGroupName.hospitalId.hospitalName,usergroup:issue.userGroupName.name,
                        solved:<Checkbox color="success" checked={solvedLs[i]} onChange={(e)=>{handleCheck(e)}} name={String(issue.issueId)}/>});
                    //decoding issue's json
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
        { name: "id",
        label: "Issue ID",
        options: {
            filterOptions: { fullWidth: true },
            display: false,
            viewColumns: false
        }
        },
        { name: "date",
        label: "Date",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
    { name: "description",
        label: "Description",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
    { name: "equipment",
        label: "Equipment",
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
    { name: "usergroup",
      label: "User Group",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
    { name: "solved",
      label: "Solved",
        options: {
            filterOptions: { fullWidth: true },
            viewColumns: false
        }
    },
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
                title={"User Groups"}
                data={rows}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}

export default IssueTable;