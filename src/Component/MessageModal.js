import {Modal} from "react-bootstrap";

const MessageModal = ({ show, message, handleClose }) => {

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>{message}</Modal.Body>
        </Modal>
    );
}

export default MessageModal;