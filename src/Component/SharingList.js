import { Button, Modal } from 'react-bootstrap';
import {Button as MUIButton} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeSelection } from '../Storage/Actions/actions';

const SharingList = ({title,buttonText,component}) => {
    const [show,setShow] = useState(false);
    const [originalSelection,setOriginalSelection] = useState([]);
    const selection = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDiscardChanges = () => {
        setShow(false);
        dispatch(storeSelection(originalSelection));
    };
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);
    const handleSave = () => {
        setShow(false);
        setOriginalSelection(selection);
    };

    useEffect(()=>{
        setOriginalSelection(selection);
    },[])

    return ( 
        <>
        <MUIButton onClick={handleOpen}>
            {buttonText}
        </MUIButton>
    
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
        {component}
        </div>
        </Modal.Body>
        
        <Modal.Footer>
              <Button variant="secondary" onClick={handleDiscardChanges}>
                Discard Changes
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Select
              </Button>
            </Modal.Footer>
        </Modal>
        </>
     );
}
 
export default SharingList;