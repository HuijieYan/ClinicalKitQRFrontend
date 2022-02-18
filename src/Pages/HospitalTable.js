import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import GetData from "../Functions/GetData";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { getLevel, getTrustId } from "../Functions/UserStatus";
import {Button, Form, Modal} from "react-bootstrap";

const HospitalTable = () => {
    const [rows,setRows] = useState([]);
    //rows of data
    const [selected, setSelected] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [placeHolder, setPlaceHolder] = useState("");
    const [name, setName] = useState("");
    //array of indexes of selected rows

    useEffect(()=>{
        if(parseInt(getLevel()) === 3){
            GetData.getAllHospitalsByTrust(getTrustId()).then((data) => {
                const rowsData = [];
                for (let i = 0; i<data.length; i++){
                    const hospital = data[i];
                    rowsData.push({
                        hospital:hospital.hospitalName,
                        operation: <a
                            href="#"
                            style={{textDecoration: 'none'}}
                            onClick={
                                (e) => {e.preventDefault();
                                setPlaceHolder(hospital.hospitalName);
                                setModalShow(true);
                                setSelectedId(hospital.hospitalId)}
                            }>
                            Edit</a>,
                        hospitalId:hospital.hospitalId,
                    });
                }
                setRows(rowsData);
            });
        }
    },[]);
    //renders only once for fetching selection options

    function submitHospital(){
        if(selectedId !== -1){
            console.log("update a hospital with id and name");
            console.log(selectedId);
            console.log(name);
        }else {
            console.log("create a hospital with string and trust id");
            console.log(getTrustId());
            console.log(name);
        }
    }

    const columns = [
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
    ]

    const customToolbar = () => {
        return(
            <>
                <Tooltip title={"Add Hospital"}>
                    <IconButton onClick={() => {setPlaceHolder(""); setModalShow(true); setSelectedId(-1)}}>
                        <AddBusinessIcon/>
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
                //we need a delete mapping in back end

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
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <h4>Hospital Name</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Hospital Name here"
                        defaultValue={placeHolder}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {submitHospital(); setModalShow(false)}}>Submit</Button>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <MUIDataTable
                title={"Hospitals"}
                data={rows}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    );
}

export default HospitalTable;