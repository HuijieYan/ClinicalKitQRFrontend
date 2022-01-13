import MUIDataTable, { TableToolbar } from "mui-datatables";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import UserStatus from "../Component/UserStatus";
import GetData from "../Functions/GetData";
import { Checkbox } from "@mui/material";

const IssueTable = () => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows
    const[solvedLs,setSolvedLs] = useState([]);

    useEffect(()=>{
        var level = UserStatus.getLevel();
        var solved = [];
        console.log(UserStatus.getTrustId());
        console.log(UserStatus.getHospitalId());
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
            GetData.getAllIssuesByHospital(UserStatus.getHospitalId()).then((data)=>{
                var rowsData = [];
                for (let i = 0;i<data.length;i++){
                    var issue = data[i];
                    solved.push(issue.solved);
                    setSolvedLs(solved);
                    rowsData.push({id:issue.issueId,date:issue.date,description:issue.description,equipment:issue.equipmentId.name,
                        hospital:issue.userGroupName.hospitalId.hospitalName,usergroup:issue.userGroupName.name,
                        solved:<Checkbox color="success" checked={solvedLs[i]} onChange={(e)=>{handleCheck(e)}} name={issue.issueId}/>});
                    //decoding issue's json
                }
                setRows(rowsData);
                
            });
        }else if(level === 3){
            GetData.getAllIssuesByTrust(UserStatus.getTrustId()).then((data)=>{
                var rowsData = [];
                for (let i = 0;i<data.length;i++){
                    var issue = data[i];
                    console.log(issue);
                    console.log(issue.equipmentId.name);
                    solved.push(issue.solved);
                    setSolvedLs(solved);
                    rowsData.push({id:issue.issueId,date:issue.date,description:issue.description,equipment:issue.equipmentId.name,
                        hospital:issue.userGroupName.hospitalId.hospitalName,usergroup:issue.userGroupName.name,
                        solved:<Checkbox color="success" checked={solvedLs[i]} onChange={(e)=>{handleCheck(e)}} name={issue.issueId}/>});
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
                console.log("http://localhost:8080/issues/delete/issueId="+rowLs[index]);
                axios.delete("http://localhost:8080/issues/delete/issueId="+rowLs[index]);
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