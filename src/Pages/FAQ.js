import {useEffect, useState} from "react";
import GetData from "../Functions/GetData";
import Uploader from "../Functions/Uploader";
import {getLevel} from "../Functions/UserStatus";
import {Box} from "@mui/system";
import {Button, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {FormGroup, Form, Modal} from "react-bootstrap";
import DeleteData from "../Functions/DeleteData";
import MessageModal from "../Component/MessageModal";

/**
 * FAQ page, trust admins can edit questions, and this can be seen by all users
 * @module FAQ
 */

/**
 * @constructor
 */
const FAQ = () => {
    const [questions, setQuestions] = useState([]);
    const [showQuestion, setShowQuestion] = useState(false);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const userLevel = parseInt(getLevel());

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(getAllQuestion, []);

    /**
     * @property {Function} getAllQuestion -render only once, get all exit questions from backend
     */
    function getAllQuestion(){
        GetData.getAllQuestions().then((data) => {
            setQuestions(data);
        })
    }

    /**
     * @property {Function} addQuestion -Add Question to backend if the question is valid then reset the edit modal
     */
    function addQuestion(){
        if(isValidQuestion()) {
            Uploader.addNewQuestion(question, answer);
            resetAdd();
            window.location.reload();
        }
    }

    function resetAdd(){
        setShowAddQuestion(false);
        setQuestion("");
        setAnswer("");
    }

    function deleteQuestion(id){
        DeleteData.deleteQuestion(id);
        window.location.reload();
    }

    function editQuestion(question){
        setQuestion("" + question.question);
        setAnswer("" + question.answer);
        setCurrentQuestion(question);
        setShowEditQuestion(true);
    }

    function resetEdit(){
        setShowEditQuestion(false);
        setCurrentQuestion({});
        setQuestion("");
        setAnswer("");
    }

    function updateQuestion(){
        if(isValidQuestion()){
            Uploader.updateQuestion(currentQuestion.id, question, answer);
            resetEdit();
            window.location.reload();
        }
    }

    function isValidQuestion(){
        if(question === ""){
            setShowMessage(true);
            setMessage("Error: Question is empty");
            return false;
        }else if(answer === ""){
            setShowMessage(true);
            setMessage("Error: Answer is empty");
            return false;
        }
        return true;
    }

    return(
        <Box sx={{borderStyle: 'solid', margin: '1%', borderWidth: '1px', padding: '2%', minHeight: '600px'}}>
            <MessageModal show={showMessage} message={message} handleClose={() => setShowMessage(false)}/>

            <Modal
                show={showAddQuestion}
                onHide={resetAdd}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>FAQs</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Question:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Question here"
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <h4>Answer:</h4>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter Answer here"
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addQuestion}>Submit</Button>
                    <Button onClick={resetAdd}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEditQuestion}
                onHide={resetEdit}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>FAQs</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Question:</h4>
                    <Form.Control
                        as="input"
                        placeholder="Enter Question here"
                        defaultValue={currentQuestion.question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <h4>Answer:</h4>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter Answer here"
                        defaultValue={currentQuestion.answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateQuestion}>Update</Button>
                    <Button onClick={resetEdit}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showQuestion}
                onHide={() => setShowQuestion(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>FAQs</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Question:</h4>
                    {currentQuestion.question}
                    <h4>Answer:</h4>
                    {currentQuestion.answer}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowQuestion(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <FormGroup style={{marginBottom: '1%'}}>
                {userLevel === 3 &&
                    <Button style={{marginRight: '10%', float: 'right'}}
                            variant="outlined"
                            onClick={() => setShowAddQuestion(true)
                            }>Add New</Button>
                }
                <Form.Label>FAQs</Form.Label>
            </FormGroup>

            <Divider/>

            <List>
                {
                    questions.map((question)=>{
                        if(userLevel === 3){
                            return(
                                <ListItem key={question.id} secondaryAction={
                                    <>
                                        <Button edge="end" onClick={() => editQuestion(question)}>Edit</Button>
                                        <Button edge="end" onClick={() => deleteQuestion(question.id)}>Delete</Button>
                                    </>
                                } disablePadding>
                                    <ListItemButton onClick={() => {setShowQuestion(true); setCurrentQuestion(question)}}>
                                        <ListItemText primary={question.question}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        }else {
                            return(
                                <ListItem key={question.id} disablePadding>
                                    <ListItemButton onClick={() => {setShowQuestion(true); setCurrentQuestion(question)}}>
                                        <ListItemText primary={question.question}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        }
                    })
                }
            </List>
        </Box>
    );
}

export default FAQ;