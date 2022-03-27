import {Accordion, Form, Row} from "react-bootstrap";
import React from "react";
import Parser from 'html-react-parser';

/**
 * Equipment viewing render, render all equipment data in a container
 * @class EquipmentViewRender
 * @memberof module:ViewEquipment
 * @param {string} name -name of equipment
 * @param {string} type -type of equipment
 * @param {string} category -category of equipment
 * @param {string} manufacturer -manufacturer of equipment
 * @param {string} model -model name of equipment
 * @param {array<JSON>} description -a list of JSON, keys are tab names, values are tab contents
 * @constructor
 */

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
                <Accordion.Item eventKey={index} key={index}>
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