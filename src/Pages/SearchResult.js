import { useState } from "react";
import { useEffect } from "react";
import GetData from "../Functions/GetData";

const SearchResult = ({name,category,type}) => {
    const [results,setResults] = useState("");

    useEffect(()=>{
        console.log("IH");
        GetData.searchByName(name,category,type).then((response)=>{
            setResults(response);
        });
    },[]);

    return ( 
        <div>{console.log(results)}  </div>
          
     );
}
 
export default SearchResult;