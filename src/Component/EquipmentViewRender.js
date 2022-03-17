import {Accordion, Form, Row} from "react-bootstrap";
import React from "react";
import Parser from 'html-react-parser';


const EquipmentViewRender = ({name, type, category, manufacturer, model, description}) => {
    return(
        <>
            <Row>
                <Form.Label style={{color: 'gray', textAlign: 'center'}}>{name}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Clinical System: {type}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Patient Demographic: {category}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Manufacturer: {manufacturer}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Model: {model}</Form.Label>
            </Row>

            <Accordion alwaysOpen style={{marginBottom: '2%', marginTop: '2%'}}>
            {Object.keys(description).map((key, index) => (
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>{key}</Accordion.Header>
                    <Accordion.Body>
                        {Parser(description[key])}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
            </Accordion>
        </>
    );
}

export default EquipmentViewRender;