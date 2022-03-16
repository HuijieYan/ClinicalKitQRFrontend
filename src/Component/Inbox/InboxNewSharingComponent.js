import { Button } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Uploader from "../../Functions/Uploader";
import { getHospitalId, getUserName } from "../../Functions/UserStatus";
import { storeSelection } from "../../Storage/Actions/actions";
import selectionReducer from "../../Storage/Reducers/selectionReducer";
import SharingEquipmentList from "../SharingEquipmentList";
import SharingUsergroupList from "../SharingUsergroupList";
import InboxNewSharingEquipmentList from "./InboxNewSharingEquipmentList";
import InboxNewSharingUserGroupList from "./InboxNewSharingUserGroupList";
import MessageModal from "../MessageModal";
import {Box} from "@mui/system";

const usergroupStore = createStore(selectionReducer,[]);
const equipmentStore = createStore(selectionReducer,[]);

const InboxNewSharingComponent = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const send = () =>{
        function decodeUsergroupSelection(selection){
            const result = [];
            for (let i=0;i<selection.length;i++){
                const group = [];
                const selected = String(selection[i]);
                const splitedString = selected.split("\n");
                group.push(splitedString[0]);
                //first item is the hospital id
                group.push(splitedString[1]);
                //first item is the username
                result.push(group);
            }
            return result;
        }

        function decodeEquipmentSelection(selection){
            const result = [];
            for (let i=0;i<selection.length;i++){
                const equipment = [];
                const selected = String(selection[i]);
                const splitedString = selected.split("\n");
                equipment.push(splitedString[0]);
                //first item is the equipment id
                result.push(equipment);
            }
            return result;
        }

        const sendingEquipmentIds = decodeEquipmentSelection(equipmentStore.getState());
        const sendingUsergroups = decodeUsergroupSelection(usergroupStore.getState());
        const time = new Date().toUTCString();
        Uploader.sendSharings(getHospitalId(),getUserName(),sendingEquipmentIds,sendingUsergroups,title,description,time).then((data)=>{
            if(data){
                setMessage("Send Successful");
                setTitle("");
                setDescription("");
                usergroupStore.dispatch(storeSelection([]));
                equipmentStore.dispatch(storeSelection([]));
            }else{
                setMessage("Send unsuccessful, please try again");
            }
        });

        setShowMessage(true);
    }

    return (
        <Box sx={{width: '1', padding: '1%', overflow: 'auto'}}>
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

            <Provider store={usergroupStore}>
                <SharingUsergroupList/>
                <Box sx={{
                    padding: '1%',
                    overflow: 'auto',
                    minHeight: '15%',
                    maxHeight: '50%',
                    border: 'solid',
                    borderWidth: '1px',
                    marginTop: '1%',
                    marginBottom: '1%'
                }}>
                    <InboxNewSharingUserGroupList />
                </Box>
            </Provider>

            <Provider store={equipmentStore}>
                <SharingEquipmentList/>
                <Box sx={{
                    padding: '1%',
                    overflow: 'auto',
                    minHeight: '15%',
                    maxHeight: '50%',
                    border: 'solid',
                    borderWidth: '1px',
                    marginTop: '1%',
                    marginBottom: '1%'
                }}>
                    <InboxNewSharingEquipmentList />
                </Box>
            </Provider>

            <Form.Group>
                <Form.Control type="title"
                              placeholder="Title"
                              style={{marginTop: '1%', marginBottom: '1%'}}
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}/>

                <Form.Control type="description"
                              placeholder="Description"
                              as="textarea"
                              rows={5}
                              style={{marginTop: '1%', marginBottom: '1%'}}
                              value={description}
                              onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>

            <Button variant="outlined" style={{marginTop: '1%'}} onClick={send}>Send</Button>
        </Box>
    );
}
 
export default InboxNewSharingComponent;