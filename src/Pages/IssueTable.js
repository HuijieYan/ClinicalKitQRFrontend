import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import { Checkbox } from "@mui/material";
import { getHospitalId, getLevel, getTrustId } from "../Functions/UserStatus";
import DeleteData from "../Functions/DeleteData";
import {Button, Modal} from "react-bootstrap";

//Issue Table is a table contains reported issues and it's corresponding operations

const IssueTable = () => {
    //rows of data
    const [rows,setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    //array of indexes of selected rows
    const[solvedLs,setSolvedLs] = useState([]);
    const viewURL = process.env.REACT_APP_FRONTEND_URL + "viewEquipment/id=";

    const [showIssue, setShowIssue] = useState(false);
    const [currentIssue, setCurrentIssue] = useState("");

    useEffect(()=>{
        const level = parseInt(getLevel());
        if (level === 2){
            setColumns([
                {
                    name: "id",
                    label: "Issue ID",
                    options: {
                        filter: false,
                        display: false,
                        viewColumns: false,
                    }
                },

                {
                    name: "date",
                    label: "Date",
                    options: {
                        filterOptions: { fullWidth: true },
                    }
                },

                {
                    name: "description",
                    label: "Description",
                    options: {
                        filter: false,
                        sort: false,
                    }
                },

                {
                    name: "equipment",
                    label: "Equipment",
                    options: {
                        filterOptions: { fullWidth: true },
                    }
                },

                {
                    name: "hospital",
                    options: {
                        filter: false,
                        display: false,
                        viewColumns: false,
                    }
                },

                {
                    name: "usergroup",
                    label: "User Group",
                    options: {
                        filterOptions: { fullWidth: true },
                    }
                },

                {
                    name: "solved",
                    label: "Solved",
                    options: {
                        filter: false,
                        sort: false,
                        viewColumns: false,
                    }
                },
            ]);

            GetData.getAllIssuesByHospital(getHospitalId()).then((data) => initialiseRow(data));
        }else if(level === 3){
            GetData.getAllIssuesByTrust(getTrustId()).then((data) => initialiseRow(data));
        }
    },[]);
    //renders only once for fetching selection options

    function initialiseRow(data){
        const solved = [];
        const rowsData = [];
        for (let i = 0; i<data.length; i++){
            const issue = data[i];
            solved.push(issue.solved);
            setSolvedLs(solved);
            rowsData.push({
                id: issue.issueId,
                date: issue.date,
                description:
                    <>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            setShowIssue(true);
                            setCurrentIssue(issue.description);
                        }} style={{ textDecoration: "none", marginRight: '8%'}}>View Issue</a>
                        <a href={viewURL + issue.equipmentId.equipmentId}
                           style={{ textDecoration: "none"}}>View Equipment</a>
                    </>,
                equipment: issue.equipmentId.name,
                hospital: issue.userGroupName.hospitalId.hospitalName,
                usergroup: issue.userGroupName.name,
                solved: <Checkbox color="success" checked={solvedLs[i]} onChange={(e)=>{handleCheck(e)}} name={String(issue.issueId)}/>
            });
            //decoding issue's json
        }
        setRows(rowsData);
    }

    function handleCheck(e){
        GetData.setIssueSolved(e.target.name,e.target.checked);
    }

    const [columns,setColumns] = useState([
        {
            name: "id",
            label: "Issue ID",
            options: {
                filter: false,
                display: false,
                viewColumns: false,
            }
        },

        {
            name: "date",
            label: "Date",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "description",
            label: "Description",
            options: {
                filter: false,
                sort: false,
                viewColumns: false,
            }
        },

        {
            name: "equipment",
            label: "Equipment",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "hospital",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "usergroup",
            label: "User Group",
            options: {
                filterOptions: { fullWidth: true },
            }
        },

        {
            name: "solved",
            label: "Solved",
            options: {
                filter: false,
                sort: false,
                viewColumns: false,
            }
        },
    ]);

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
                const index = selected[i] - i;
                DeleteData.deleteIssue(rowLs[index].id);
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
            <Modal
                show={showIssue}
                onHide={() => setShowIssue(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <p style={{whiteSpace: 'pre-wrap'}}>{currentIssue}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowIssue(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

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