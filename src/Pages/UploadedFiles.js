import { saveAs } from "file-saver";


const UploadedFiles = ({id}) => {
    //const file = GetData.getFile(id);
    const extension = id.substring(id.lastIndexOf('.')+1);
    const imageExtensions = ["png","jpg","jpeg","tif", "tiff","bmp","gif","eps","raw"];
    const videoExtensions = ["webm","flv","mkv","vob", "mp4","ogg","ogv","avi","wmv","rm","rmvb","m4v","mpeg"];
    const audioExtensions = ["wav","flac","mp4","m4a","wma","mp3"];

    if (imageExtensions.indexOf(extension)!==-1){
        return ( 
            <img className="images" src={"http://localhost:8080/file/download/"+id} alt={""}/>
            );
    }else if (videoExtensions.indexOf(extension)!==-1){
        return ( 
            <video controls>
            <source src={"http://localhost:8080/file/download/"+id}/>
            </video> 
            );
    }else if(audioExtensions.indexOf(extension)!==-1){
        return ( 
            <audio controls><source src={"http://localhost:8080/file/download/"+id}/></audio>
            );
    }else{
        return(
            <div>{saveAs("http://localhost:8080/file/download/"+id,id)}</div>
        );
    }
    
}
 


export default UploadedFiles;