import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChart = {
  options: any;
  data: any;
};

export function PieChart({ options, data }: PieChart) {
  return <Pie data={data} options={options} />;
}
