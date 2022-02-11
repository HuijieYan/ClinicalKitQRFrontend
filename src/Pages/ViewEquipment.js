import {Accordion, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import GetData from "../Functions/GetData";

const ViewEquipment = (props) => {
    const {id} = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState([]);


    useEffect(() => {
        if(id != null){
            GetData.getEquipmentById(id).then((data)=>{
                setName(data.name);
                setType(data.type);
                setCategory(data.category);

                const tmp = document.createElement("DIV");
                tmp.innerHTML = data.content;
                tmp.accessKey = "temp";
                const tabs = tmp.getElementsByClassName('tab');
                let content = [];
                const tabNum = tabs.length;
                const parse = require('html-react-parser');
                for (let i = 0; i < tabNum; i++) {
                    const tabHeader = tabs[0].getElementsByClassName('tabHeader');
                    let headerTag = [];
                    headerTag.push(<Accordion.Header>{parse(tabHeader[1].innerHTML)}</Accordion.Header>);
                    tabs[0].removeChild(tabHeader[0]);
                    tabs[0].removeChild(tabHeader[0]);
                    tabs[0].removeChild(tabHeader[0]);
                    let bodyTag = [];
                    bodyTag.push(<Accordion.Body>{parse(tabs[0].innerHTML)}</Accordion.Body>);
                    content.push(<Accordion.Item eventKey={i+1}>{headerTag}{bodyTag}</Accordion.Item>);
                    tmp.removeChild(tabs[0]);
                }
                content.push(
                    <Accordion.Item eventKey={0}>
                        <Accordion.Header>Additional Description</Accordion.Header>
                        <Accordion.Body>{parse(tmp.innerHTML)}</Accordion.Body>
                    </Accordion.Item>);
                setContent(content);
            });
        }

    }, []);

    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", borderColor: "grey", textAlign: 'left', fontSize: 'x-large'}}>
            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Name: {name}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Type: {type}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Category: {category}</Form.Label>
            </Row>

            <Accordion alwaysOpen>
                {content}
            </Accordion>
        </Container>
    );
}

export default ViewEquipment;