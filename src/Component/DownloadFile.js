import GetData from "../Functions/GetData";


const DownloadFile = ({ id }) => {
    GetData.getFile(id);
    return null;
}

export default DownloadFile;