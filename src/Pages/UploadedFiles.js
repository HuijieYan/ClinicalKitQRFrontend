import GetData from "../Functions/GetData";

const UploadedFiles = ({id}) => {
    //const file = GetData.getFile(id);

    return ( 
        <img class="images" src={"http://localhost:8080/file/download/"+id} alt={""} />
     );
}
 
export default UploadedFiles;