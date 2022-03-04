import { Button } from "@mui/material";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
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

const usergroupStore = createStore(selectionReducer,[]);
const equipmentStore = createStore(selectionReducer,[]);

const InboxNewSharingComponent = ({display}) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [show,setShow] = useState(false);
    const [message,setMessage] = useState("");
    const handleClose = ()=>setShow(false);

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
        
        setShow(true);
    }

    if(display){
        return (  
            <div>
                <Provider store={usergroupStore}>
                    <SharingUsergroupList/>
                    <InboxNewSharingUserGroupList />
                </Provider>
                <Provider store={equipmentStore}>
                    <SharingEquipmentList/>
                    <InboxNewSharingEquipmentList />
                </Provider>
                
            
            <Form>
                <Form.Group id="title">
                    <Form.Control type="title"
                                placeholder="Title"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="Description">
                    <Form.Control type="description"
                                placeholder="Description"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>
            </Form>
            
            <Button onClick={send}>Send</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>Message</Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }else{
        return null;
    }
}
 
export default InboxNewSharingComponent;