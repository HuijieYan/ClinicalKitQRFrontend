import {Form, Container, Button, Row, Col, FormControl} from "react-bootstrap";
import { Editor } from '@tinymce/tinymce-react';

const EditEquipment = (props) => {
    const {equipmentName, id} = props;
    return (
        <Container>
            <Form style={{marginTop: '3%', marginBottom: '3%'}}>
                <Row>
                    <Col>
                        <Form.Group style={{textAlign: 'left', fontSize: 'x-large'}}>
                            <Form.Label style={{color: 'gray', textAlign: 'left', fontSize: 'x-large'}}>Equipment Name: {equipmentName} </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col xs='auto'>
                        <Form.Control type="text"/>
                    </Col>
                    <Col xs='auto'>
                        <Button variant="outline-success">Rename To</Button>
                    </Col>
                    <Col xs='auto'>
                        <FormControl
                            type="search"
                            placeholder="Search Equipment ID"
                            aria-label="Search"
                        />
                    </Col>
                    <Col xs='auto'>
                        <Button variant="outline-success">Search</Button>
                    </Col>
                </Row>

                <Row>
                    <Form.Group style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                        <Form.Label style={{color: 'gray', marginRight: '2%'}}>User Group:</Form.Label>
                        <select style={{fontSize: 'x-large'}}>
                            <option value="-1" label="Select Trust"/>
                            <option value="0" label="User Group 1"/>
                            <option value="1" label="User Group 2"/>
                            <option value="2" label="User Group 3"/>
                            <option value="3" label="User Group 4"/>
                        </select>
                    </Form.Group>
                </Row>

                <Form.Group style={{textAlign: 'left', fontSize: 'x-large', marginTop: '3%'}}>
                    <Form.Label style={{color: 'gray', marginRight: '2%'}}>Equipment Type:</Form.Label>
                    <select style={{fontSize: 'x-large'}}>
                        <option value="-1" label="Select Type"/>
                        <option value="0" label="Type 1"/>
                        <option value="1" label="Type 2"/>
                        <option value="2" label="Type 3"/>
                    </select>
                </Form.Group>
            </Form>
            <Editor
                apiKey="ss9xuyjb5f9h3evt41gz1yxf2nqw2ovqjcr5sozwce6p64dy"
                initialValue="<p>Content</p>"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor help',
                        'searchreplace visualblocks code insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent | table | \
                        link | preview | image | print | help'
                }}
            />
        </Container>
    );
}

export default EditEquipment;