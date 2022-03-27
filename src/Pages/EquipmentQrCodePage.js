/**
 * This page is used for showing equipment QR code, a picture downloaded from backend, get by equipment id
 * @module EquipmentQrCodePage
 */

/**
 * @param {number} props -The equipment id for downloading
 * @constructor
 */

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
