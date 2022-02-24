import GetData from "./GetData";
export function createGraphDataFromEquipment(id) {
  const graphData = { datasets: [{ data: [] }], labels: [] };
  GetData.getViewingsByEquipmentId(id).then((data) => {
    const equipmentData = data;

    for (let index = 0; index < equipmentData.length; index++) {
      const equipmentViewData = equipmentData[index];
      graphData.labels.push(equipmentViewData.userGroup.name);
      graphData.datasets[0].data.push(equipmentViewData.viewCount);
    }
  });
  return graphData;
}
