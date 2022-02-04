import { useState } from "react";
import { Form } from "react-bootstrap";

const InboxNewSharingComponent = ({display}) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    if(display){
        return (  
            <div>
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
                                placeholder="description"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                rows={20}/>
                </Form.Group>
            </Form>
            </div>
        );
    }else{
        return null;
    }
}
 
export default InboxNewSharingComponent;