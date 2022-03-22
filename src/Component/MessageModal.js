import {Modal} from "react-bootstrap";

const MessageModal = ({ show, message, handleClose }) => {

    return(
        <Modal show={show} onHide={handleClose} style={{zIndex: "9999"}}>
            <Modal.Header closeButton/>
            <Modal.Body>{message}</Modal.Body>
        </Modal>
    );
}

export default MessageModal;