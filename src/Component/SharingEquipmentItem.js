import SharingListItems from "./SharingListItems";

const SharingEquipmentItem = ({ data }) => {
  const generateNodes = (input) => {
    const currentHospital = null;
    const equipments = [];
    const hospitals = [];
    const specialIndex = -1;
    const tree = { label: "All Hospitals", value: String(specialIndex) };
    specialIndex--;

    if (input.length > 0) {
      const equipment = input[0];
      const hospital = equipment.hospitalId;

      currentHospital = hospital;
      //set the hospital and trust pointer to current hospital
    }

    for (let i = 0; i < input.length; i++) {
      const equipment = input[i];
      const hospital = equipment.hospitalId;
      const id = String(equipment.equipmentId) + "\n" + equipment.name;

      if (currentHospital.hospitalId !== hospital.hospitalId) {
        hospitals.push({
          label: currentHospital.hospitalName,
          value: String(specialIndex),
          children: equipments,
        });
        equipments = [];
        currentHospital = hospital;
        specialIndex--;
      }

      equipments.push({ label: equipment.name, value: id });
    }

    hospitals.push({
      label: currentHospital.hospitalName,
      value: String(specialIndex),
      children: equipments,
    });
    tree["children"] = hospitals;
    console.log("IH");
    console.log(tree);
    return tree;
  };

  return <SharingListItems data={data} generateNodes={generateNodes} />;
};

export default SharingEquipmentItem;
