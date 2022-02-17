import {Button, Container, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import GetData from "../Functions/GetData";
import EquipmentViewRender from "../Component/EquipmentViewRender";

const PreviewEquipment = (props) => {
    const {id} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(id != null){
            GetData.getSentEquipmentById(id).then((data)=>{
                setName(data.name);
                setType(data.type);
                setCategory(data.category);
                setDescription(data.content);
            });
        }

    }, []);


    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", paddingTop: '1%', borderColor: "grey", textAlign: 'left', fontSize: 'x-large'}}>
            <EquipmentViewRender name={name} type={type} category={category} description={description}/>
        </Container>
    );
}

export default PreviewEquipment;