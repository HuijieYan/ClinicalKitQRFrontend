import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // do not delete, is needed
import { Row } from "react-bootstrap";

const PieChart = (props) => {
  return (
    <div className="graph d-flex justify-content-center">
      <Row className="justify-content-center">
        <Pie
          height={400}
          width={400}
          options={{ maintainAspectRatio: false, responsive: false }}
          data={props.data}
        />
      </Row>
    </div>
  );
};

export default PieChart;
