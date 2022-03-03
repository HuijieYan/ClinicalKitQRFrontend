const EquipmentQrCodePage = (props) => {
  const { id } = props;

  return (
    <div>
      <img
        src={process.env.REACT_APP_BACKEND_URL + "equipment/qrcode/id=" + id}
      />
    </div>
  );
};

export default EquipmentQrCodePage;
