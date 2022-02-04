import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GetData from "../Functions/GetData";

const SearchPage = () => {
    const [types,setTypes] = useState([]);
    const [categories,setCategories] = useState([]);
    const [selectedType,setSelectedType] = useState("None");
    const [selectedCategory,setSelectedCategory] = useState("None");
    const [name,setName] = useState("");
    const history = useHistory();
    
    const search = () =>{
        
        if(name === ""){
            return;
        }
        //console.log("/result?name="+name+" category="+selectedCategory+" type="+selectedType);
        history.push("/result/name="+name+"/category="+selectedCategory+"/type="+selectedType);
    }

    useEffect(()=>{
        GetData.getTypes().then((types)=>{
            setTypes(types);
        });
        GetData.getCategories().then((categories)=>{
            setCategories(categories);
        });
    },[])

    return ( 
        <div>   
        <Form>
            <Row className="mb-3">
                    <Form.Select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
                        <option defaultValue="None"></option>  
                        {categories.map(category=>(
                        <option key={category} value={category} label={category}/>
                        ))}
                    </Form.Select>
            </Row>
        </Form>
        <Form>
            <Row className="mb-3">
                <Form.Select value={selectedType} onChange={(e)=>setSelectedType(e.target.value)}>
                    <option defaultValue="None"></option>   
                    {types.map(type=>(
                    <option key={type} value={type} label={type}/>
                    ))}

                </Form.Select>
            </Row>
        </Form>
        <Form>
            <Form.Group id="searchbar">
                <Form.Control type="searchbar"
                            placeholder="Enter Equipment Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
        </Form>
        <Button type="submit" onClick={(e)=>{search()}}>Search</Button>
        </div>
     );
}
 
export default SearchPage;