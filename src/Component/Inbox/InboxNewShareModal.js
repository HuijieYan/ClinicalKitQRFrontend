import { Button, Modal } from "react-bootstrap";
import { Button as ButtonMui } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import SharingEquipmentList from "../SharingEquipmentList";
import SharingUsergroupList from "../SharingUsergroupList";

const InboxNewShareModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Share to...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ButtonMui>Add Admin</ButtonMui>
            <ButtonMui>Add Equipment</ButtonMui>
            <Form>
              <Form.Group id="title">
                <Form.Control
                  type="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group id="Description">
                <Form.Control
                  type="description"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
            <SharingUsergroupList />
            <SharingEquipmentList />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Share</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InboxNewShareModal;
