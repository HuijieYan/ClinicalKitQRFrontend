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
import DeleteData from "../Functions/DeleteData";
import Uploader from "../Functions/Uploader";
import MessageModal from "../Component/MessageModal";

/**
 * Hospital Table is a table contains hospital data and it's corresponding operations
 * @module HospitalTable
 * @constructor
 */
const HospitalTable = () => {
    //rows of data
    const [rows,setRows] = useState([]);
    //array of indexes of selected rows
    const [selected, setSelected] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [messageShow, setMessageShow] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    const [placeHolder, setPlaceHolder] = useState("");
    const [name, setName] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(initializeHospitals,[]);

    /**
     * @property {Function} initializeHospitals
     * renders only once, get all hospital from backend, and initialize table row data, only Trust Admin has permission
     */
    function initializeHospitals(){
        if(parseInt(getLevel()) === 3){
            GetData.getAllHospitalsByTrust(getTrustId()).then((data) => {
                const rowsData = [];
                for (let i = 0; i<data.length; i++){
                    const hospital = data[i];
                    if (hospital.hospitalName!=="Trust Admin"){
                        rowsData.push({
                            hospital:hospital.hospitalName,
                            operation: <a
                                href="#"
                                style={{textDecoration: 'none'}}
                                onClick={
                                    (e) => {e.preventDefault();
                                        setPlaceHolder(hospital.hospitalName);
                                        setName(hospital.hospitalName);
                                        setModalShow(true);
                                        setSelectedId(hospital.hospitalId)}
                                }>
                                Edit</a>,
                            hospitalId:hospital.hospitalId,
                        });
                    }

                }
                setRows(rowsData);
            });
        }
    }

    /**
     * @property {Function} submitHospital
     * Add a new hospital or edit a exit hospital name
     */
    function submitHospital(){
        if(name === ""){
            setShowMessage(true);
            setMessage("Error: Hospital Name is empty");
            return;
        }

        if(selectedId !== -1){
            Uploader.updateHospital(selectedId,name);
        }else {
            Uploader.addNewHospital(getTrustId(),name);
        }
        window.location.reload();
    }

    const columns = [
        {
            name: "hospital",
            label: "Hospital",
        },

        {
            name: "operation",
            label: "Edit",
            options: {sort: false}
        },

        {
            name: "hospitalId",
            label: "Hospital ID",
            options: {display: false}
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

    /**
     * @property {Function} deleteHospitals- delete uer selected hospital(s)
     */
    function deleteHospitals(){
        const rowLs = rows;
        for (let i = 0; i < selected.length; i++){
            const index = selected[i] - i;
            DeleteData.deleteHospital(rows[index].hospitalId);
            rowLs.splice(index,1);
        }
        setRows(rowLs);
        setSelected([]);
    }

    const options = {
        filterType: "multiselect",
        height: "100%",
        jumpToPage: true,
        viewColumns: false,
        filter: false,
        onRowSelectionChange:function(currentRowsSelected, allRowsSelected, rowsSelected){
            setSelected(rowsSelected);
        },
        onRowsDelete:function(){
            setMessageShow(true);
            return true;
        },
        customToolbar: customToolbar,
    };

    function handleClose(){
        setModalShow(false);
        setName("");
    }

    return (
        <ThemeProvider theme={createTheme()}>
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

            <Modal
                show={modalShow}
                onHide={handleClose}
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
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => {submitHospital(); handleClose();}}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={messageShow}
                onHide={() => setMessageShow(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                <h4>Selected hospitals will be deleted permanently</h4>
                    Once you delete these hospitals, they cannot be retrieved.
                    Be careful, delete these hospitals mean all data in these hospitals will be lost.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {deleteHospitals(); setMessageShow(false)}}>Delete</Button>
                    <Button onClick={() => setMessageShow(false)}>Close</Button>
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