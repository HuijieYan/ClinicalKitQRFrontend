import {Accordion, Form, Row} from "react-bootstrap";


const EquipmentViewRender = ({name, type, category, manufacturer, model, description}) => {
    const content = parseContent(description);

    function parseContent(description){
        const tmp = document.createElement("DIV");
        tmp.innerHTML = description;
        const tabs = tmp.getElementsByClassName('tab');
        let content = [];
        const tabNum = tabs.length;
        const parse = require('html-react-parser');
        for (let i = 0; i < tabNum; i++) {
            const tabHeader = tabs[0].getElementsByClassName('tabHeader');
            let headerTag = [];

            if(tabHeader.length === 3){
                headerTag.push(<Accordion.Header>{parse(tabHeader[1].innerHTML)}</Accordion.Header>);
            }

            const headerLength = tabHeader.length;
            for(let index = 0; index < headerLength; index++){
                tabs[0].removeChild(tabHeader[0])
            }

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

        return content;
    }

    return(
        <>
            <Row>
                <Form.Label style={{color: 'gray', textAlign: 'center'}}>{name}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Type: {type}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Category: {category}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Manufacturer: {manufacturer}</Form.Label>
            </Row>

            <Row>
                <Form.Label style={{color: 'gray'}}>Equipment Model: {model}</Form.Label>
            </Row>

            <Accordion alwaysOpen>
                {content}
            </Accordion>
        </>
    );
}

export default EquipmentViewRender;