import { saveAs } from "file-saver";


const UploadedFiles = ({id}) => {
    //const file = GetData.getFile(id);
    const extension = id.substring(id.lastIndexOf('.')+1);
    const imageExtensions = ["png","jpg","jpeg","tif", "tiff","bmp","gif","eps","raw"];
    const videoExtensions = ["webm","flv","mkv","vob", "mp4","ogg","ogv","avi","wmv","rm","rmvb","m4v","mpeg"];
    const audioExtensions = ["wav","flac","mp4","m4a","wma","mp3"];

    return(
        <div>{saveAs("http://localhost:8080/file/download/"+id,id)}</div>
    );
    
}
 


export default UploadedFiles;