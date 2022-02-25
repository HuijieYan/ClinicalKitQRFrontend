import React, { useState, useEffect } from "react";
import { Pie, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // do not delete, is needed

const PieChart = (props) => {
  return (
    <div className="graph">
      <Pie
        height={400}
        width={400}
        options={{ maintainAspectRatio: false }}
        data={props.data}
      />
    </div>
  );
};

export default PieChart;
