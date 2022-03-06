import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GetData from "../Functions/GetData";

//Search page for equipment

const SearchPage = () => {
    const [types,setTypes] = useState([]);
    const [categories,setCategories] = useState([]);
    const [selectedType,setSelectedType] = useState("all");
    const [selectedCategory,setSelectedCategory] = useState("all");
    const [selectedManufacturer,setSelectedManufacturer] = useState("all");
    const [manufacturers,setManufacturers] = useState([]);
    const [selectedModel,setSelectedModel] = useState("all");
    const [models,setModels] = useState([]);
    const [name,setName] = useState("");
    const history = useHistory();
    
    const search = () =>{
        var searchName = " ";
        if(name !== ""){
            searchName = name;
        }
        history.push("/result/name="+searchName+"/category="+selectedCategory+"/type="+selectedType+"/manufacturer="+selectedManufacturer+"/model="+selectedModel);
    }

    useEffect(()=>{
        GetData.getTypes().then((types)=>{
            setTypes(types);
        });
        GetData.getCategories().then((categories)=>{
            setCategories(categories);
        });
        GetData.getAllManufacturers().then((manufacturers)=>{
            setManufacturers(manufacturers);
        });
    },[])

    useEffect(()=>{
        if(selectedManufacturer === "all"){
            GetData.getAllModelsByUser().then((models)=>{
                setModels(models);
                console.log(models);
            });
        }else{
            GetData.getAllModelsByManufacturer(selectedManufacturer).then((models)=>{
                setModels(models);
                console.log(models);
            });
        }
        setSelectedModel("all");
    },[selectedManufacturer]);

    return ( 
        <div>   
        <Form>
            <Row className="mb-3">
                <Form.Label>Patient Demographic</Form.Label>
                <Form.Select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                    <option value="all" label="All"/>
                    {categories.map(category=>(
                        <option key={category} value={category} label={category}/>
                    ))}
                </Form.Select>
            </Row>
            <Row className="mb-3">
                <Form.Label>Clinical Sysyem</Form.Label>
                <Form.Select value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}>
                    <option value="all" label="All"/>
                    {types.map(type=>(
                        <option key={type} value={type} label={type}/>
                    ))}

                </Form.Select>
            </Row>
            <Row className="mb-3">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Select value={selectedManufacturer} onChange={(e)=>{setSelectedManufacturer(e.target.value)}}>
                    <option value="all" label="All"/>
                    {manufacturers.map(manufacturer=>(
                        <option key={manufacturer} value={manufacturer} label={manufacturer}/>
                    ))}
                </Form.Select>
            </Row>
            <Row className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Select value={selectedModel} onChange={(e)=>setSelectedModel(e.target.value)}>
                    <option value="all" label="All"/>
                    {models.map(model=>(
                        <option key={model} value={model} label={model}/>
                    ))}
                </Form.Select>
            </Row>
            <Row className="mb-3">
                <Form.Group id="searchbar">
                    <Form.Control type="searchbar"
                                placeholder="Enter Equipment Name or 9-Digit Code"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
            </Row>
        </Form>
        <Button type="submit" onClick={()=>{search()}}>Search</Button>
        </div>
     );
}
 
export default SearchPage;