import GetData from "./GetData";
export function createGraphDataFromEquipment(equipmentData) {
  GetData.getViewingsByEquipmentId(4).then((data) => {
    const eData = data;
    console.log(Object.is(eData[0].userGroup === eData[1].userGroup));
    console.log(eData[0].userGroup);
    console.log(eData);
  });
}
