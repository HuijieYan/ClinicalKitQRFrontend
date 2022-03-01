export function createGraphData(equipmentName, data) {
  const graphData = {
    datasets: [{ data: [], label: "", backgroundColor: [] }],
    labels: [],
  };
  graphData.datasets[0].label = equipmentName;

  for (let index = 0; index < data.length; index++) {
    const equipmentViewData = data[index];
    graphData.labels.push(equipmentViewData.userGroup.name);
    graphData.datasets[0].data.push(equipmentViewData.viewCount);
    graphData.datasets[0].backgroundColor.push(generateRandomColor());
  }

  return graphData;
}

function generateRandomColor() {
  let maxVal = 0xffffff;
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}
