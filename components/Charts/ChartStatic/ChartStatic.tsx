import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IPropsChartStatic } from "./ChartStatic.props";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartStatic = ({ options, data }: IPropsChartStatic): JSX.Element => {
  return <Bar options={options} data={data} />;
};

export default ChartStatic;
