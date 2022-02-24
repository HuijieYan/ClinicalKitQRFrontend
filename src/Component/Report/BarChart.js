import React, { useState, useEffect } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // do not delete, is needed

const BarChart = (props) => {
  return (
    <div className="graphs">
      <Bar
        height={400}
        width={400}
        options={{ maintainAspectRatio: false }}
        data={props.data}
      />
    </div>
  );
};

export default BarChart;
