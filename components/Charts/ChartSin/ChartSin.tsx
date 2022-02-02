import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IPropsChartSin } from "./ChartSin.props";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartSin = ({ options, data }: IPropsChartSin): JSX.Element => {
  return <Line options={options} data={data} />;
};

export default ChartSin;
