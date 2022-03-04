import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // do not delete, is needed
import { Row } from "react-bootstrap";

const BarChart = (props) => {
  return (
    <div className="graph d-flex justify-content-center">
      <Row className="justify-content-center">
        <Bar
          height={400}
          width={400}
          options={{ maintainAspectRatio: false, responsive: true }}
          data={props.data}
        />
      </Row>
    </div>
  );
};

export default BarChart;
