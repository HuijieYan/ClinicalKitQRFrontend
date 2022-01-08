

const EquipmentQrCodePage = (props) => {
    const {id} = props;

    return ( 
        <div>
            <img src={"http://localhost:8080/equipment/qrcode/id="+id} />
        </div>
     );
}
 
export default EquipmentQrCodePage;