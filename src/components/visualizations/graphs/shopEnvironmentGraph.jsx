import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ShopEnvironmentGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    // return <p>No data available</p>;
    return null;
  }

  const reversedData = [...data].reverse();

  const lineChartData = {
    labels: reversedData.map((entry) =>
      new Date(entry.date).toLocaleDateString("en-GB")
    ),
    datasets: [
      {
        label: "CO2 Levels",
        data: reversedData.map((entry) => entry.co2_level),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
      {
        label: "Temperature",
        data: reversedData.map((entry) => entry.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
      {
        label: "Humidity",
        data: reversedData.map((entry) => entry.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        tension: 0.4,
      },
      {
        label: "AQI",
        data: reversedData.map((entry) => entry.aqi),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
      },
      {
        label: "Light Level",
        data: reversedData.map((entry) => entry.light_level),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 206, 86, 1)",
        tension: 0.4,
      },
      {
        label: "Noise Level",
        data: reversedData.map((entry) => entry.noise_level),
        borderColor: "rgba(201, 203, 207, 1)",
        backgroundColor: "rgba(201, 203, 207, 0.2)",
        pointBackgroundColor: "rgba(201, 203, 207, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(201, 203, 207, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Shop Environment Over Time",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
          },
        },
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
          font: {
            size: 14,
          },
        },
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default ShopEnvironmentGraph;
