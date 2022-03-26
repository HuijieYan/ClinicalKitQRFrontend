import { Container } from "react-bootstrap";
import {useEffect, useState} from "react";
import GetData from "../Functions/GetData";
import EquipmentViewRender from "../Component/EquipmentViewRender";

/**
 * PreviewEquipment is only used for inbox equipment preview in certain component,
 * EquipmentViewRender is responsible for render the page
 * @class PreviewEquipment
 * @memberof module:ViewEquipment
 */

/**
 * @param {string} id -a temporary id in database only used to preview equipment
 * @constructor
 */
const PreviewEquipment = ({id}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState({});

    useEffect(initializeEquipment, []);

    /**
     * @property {Function} initializeEquipment
     * render only once, get equipment by a temporary id
     */
    function initializeEquipment(){
        if(id != null){
            GetData.getSentEquipmentById(id).then((data)=>{
                setName(data.name);
                setType(data.type);
                setCategory(data.category);
                setManufacturer(data.manufacturer);
                setModel(data.modelName);
                setDescription(JSON.parse(data.content));
            });
        }
    }

    return(
        <Container style={{borderStyle: "solid", marginTop: "1%", marginBottom: "1%", paddingTop: '1%', borderColor: "grey", textAlign: 'left', fontSize: 'x-large'}}>
            <EquipmentViewRender name={name}
                                 type={type}
                                 category={category}
                                 manufacturer={manufacturer}
                                 model={model}
                                 description={description}/>
        </Container>
    );
}

export default PreviewEquipment;