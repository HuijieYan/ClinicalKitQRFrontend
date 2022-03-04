//QR code image, get by id

const EquipmentQrCodePage = (props) => {
  const { id } = props;

  return (
    <div>
      <img
        src={process.env.REACT_APP_BACKEND_URL + "equipment/qrcode/id=" + id}
        alt={id}
      />
    </div>
  );
};

export default EquipmentQrCodePage;
