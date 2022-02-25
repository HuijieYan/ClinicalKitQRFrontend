export function createGraphData(equipmentName, data) {
  const graphData = { datasets: [{ data: [], label: "" }], labels: [] };
  graphData.datasets[0].label = equipmentName;

  for (let index = 0; index < data.length; index++) {
    const equipmentViewData = data[index];
    graphData.labels.push(equipmentViewData.userGroup.name);
    graphData.datasets[0].data.push(equipmentViewData.viewCount);
  }

  return graphData;
}
