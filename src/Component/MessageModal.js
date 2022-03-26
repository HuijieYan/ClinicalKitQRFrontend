import {Modal} from "react-bootstrap";

/**
 * MessageModal
 * @class MessageModal
 * @param {boolean} show -this variable determine whether the modal show
 * @param {string} message -the message shown by modal
 * @param {Function} handleClose -close function of this modal
 * @constructor
 */
const MessageModal = ({ show, message, handleClose }) => {

    return(
        <Modal show={show} onHide={handleClose} style={{zIndex: "9999"}}>
            <Modal.Header closeButton/>
            <Modal.Body>{message}</Modal.Body>
        </Modal>
    );
}

export default MessageModal;