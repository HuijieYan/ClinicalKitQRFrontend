import { Button, Container, Form, Modal } from "react-bootstrap";
import { useEffect, useState} from "react";
import GetData from "../Functions/GetData";
import EquipmentViewRender from "../Component/EquipmentViewRender";
import Uploader from "../Functions/Uploader";
import MessageModal from "../Component/MessageModal";

//This is equipment display page for user, and it contains the corresponding report modal

const ViewEquipment = ({id}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [issue, setIssue] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if(id !== null){
            GetData.getEquipmentById(id).then((data)=>{
                if(data === ""){
                    setShowMessage(true);
                    setMessage("Error: You are not allowed to see this Equipment!")
                }else {
                    setName(data.name);
                    setType(data.type);
                    setCategory(data.category);
                    setManufacturer(data.model.manufacturer.manufacturerName);
                    setModel(data.model.modelName);
                    setDescription(JSON.parse(data.content));
                    setAuthenticated(true);
                }
            });
        }
    }, []);

    function submitIssue() {
        if(issue === ""){
            setModalShow(false);
            setShowMessage(true);
            setMessage("Error: empty issue");
        }else {
            Uploader.submitIssue(issue,id).then((response) => {
                if(response !== ""){
                    setModalShow(false);
                    setShowMessage(true);
                    setMessage(response.data);
                }
            })
            resetIssue();
        }
    }

    function resetIssue(){
        setModalShow(false);
        setIssue("");
    }

    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", paddingTop: '1%', borderColor: "grey", textAlign: 'left', fontSize: 'x-large'}}>
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

            {authenticated &&
            <>
                <Button variant="primary" style={{float: 'right'}} onClick={() => setModalShow(true)}>Report Issue</Button>

                <Modal
                    show={modalShow}
                    onHide={resetIssue}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Issue Description</h4>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter the description here."
                                onChange={(e) => setIssue(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={submitIssue}>Submit</Button>
                        <Button onClick={resetIssue}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <EquipmentViewRender name={name}
                                     type={type}
                                     category={category}
                                     manufacturer={manufacturer}
                                     model={model}
                                     description={description}/>
            </>
            }
        </Container>
    );
}

export default ViewEquipment;