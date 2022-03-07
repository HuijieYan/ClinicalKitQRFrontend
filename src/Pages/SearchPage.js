import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GetData from "../Functions/GetData";
import Select from 'react-select'

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
        let searchName = " ";
        if(name !== ""){
            searchName = name;
        }
        history.push("/result/name="+searchName+"/category="+selectedCategory+"/type="+selectedType+"/manufacturer="+selectedManufacturer+"/model="+selectedModel);
    }

    useEffect(()=>{
        GetData.getTypes().then((types)=>{
            let typeOptions = [{ value: "all", label: "All" }]
            types.map((type) => {
                typeOptions.push({ value: type, label: type })
            })
            setTypes(typeOptions)
        });

        GetData.getCategories().then((categories)=>{
            let categoriesOptions = [{ value: "all", label: "All" }]
            categories.map((category) => {
                categoriesOptions.push({ value: category, label: category })
            })
            setCategories(categoriesOptions)
        });

        GetData.getAllManufacturers().then((manufacturers)=>{
            let manufacturerList = [{ value: "all", label: "All" }]
            manufacturers.map((manufacturer) => {
                manufacturerList.push({ value: manufacturer, label: manufacturer })
            })
            setManufacturers(manufacturerList)
        });
    },[])

    useEffect(()=>{
        if(selectedManufacturer === "all"){
            GetData.getAllModelsByUser().then((models)=>{
                let modelList = [{ value: "all", label: "All" }]
                models.map((model) => {
                    modelList.push({ value: model, label: model })
                })
                setModels(modelList)
            });
        }else{
            GetData.getAllModelsByManufacturer(selectedManufacturer).then((models)=>{
                let modelList = [{ value: "all", label: "All" }]
                models.map((model) => {
                    modelList.push({ value: model, label: model })
                })
                setModels(modelList)
            });
        }
        setSelectedModel("all");
    },[selectedManufacturer]);

    return ( 
        <div>
        <Form onSubmit={search}>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Patient Demographic</Form.Label>
                    <Select value={categories.filter(option => option.value === selectedCategory)}
                            options={categories}
                            onChange={(e)=>setSelectedCategory(e.value)}/>
                </Col>
                

                <Col>
                    <Form.Label>Clinical System</Form.Label>
                    <Select value={types.filter(option => option.value === selectedType)}
                            options={types}
                            onChange={(e)=>setSelectedType(e.value)}/>
                </Col>

                <Col>
                    <Form.Label>Manufacturer</Form.Label>
                    <Select value={manufacturers.filter(option => option.value === selectedManufacturer)}
                            options={manufacturers}
                            onChange={(e)=>setSelectedManufacturer(e.value)}/>
                </Col>

                <Col>
                    <Form.Label>Model</Form.Label>
                    <Select value={models.filter(option => option.value === selectedModel)}
                            options={models}
                            onChange={(e)=>setSelectedModel(e.value)}/>
                </Col>
            </Row>

            <Row className="mb-3 justify-content-center">
                <Col xs={12} md={8} lg={14}>
                    <Form.Group id="searchbar">
                        <Form.Control type="searchbar"
                                    placeholder="Enter Equipment Name or 9-Digit Code"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                </Col>
                <Col><Button type="submit">Search</Button></Col>
            </Row>
        </Form>
        
        </div>
     );
}
 
export default SearchPage;