import GetData from "../Functions/GetData";

import "./UploadedFiles.css";

const UploadedFiles = ({id}) => {
    //const file = GetData.getFile(id);

    return ( 
        <div>
        <img className="images" src={"http://localhost:8080/file/download/"+id} alt={""}/>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/_y9TfPw_wS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        );
}
 


export default UploadedFiles;