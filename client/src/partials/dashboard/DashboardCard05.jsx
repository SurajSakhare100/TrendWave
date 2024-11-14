import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Tooltip from '../../components/DashBoard/Tooltip';
import { chartAreaGradient } from '../../components/charts/ChartjsConfig';
import RealtimeChart from '../../components/charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard05() {
  // Set initial state values
  const [counter, setCounter] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [range, setRange] = useState(35);
  const [slicedData, setSlicedData] = useState([]);
  const [slicedLabels, setSlicedLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real-time data from API using axios
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/dashboard/total-sales'); // Replace with your API endpoint
        const data = response.data; // Assuming response contains the sales data
        console.log(response)
        setSlicedData(data.slice(0, range));  // Limit data based on range
        setSlicedLabels(generateDates().slice(0, range).reverse());  // Use generated dates
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchRealTimeData();
  }, [range]);

  // Generate fake dates from now to back in time
  const generateDates = () => {
    const now = new Date();
    const dates = [];
    for (let i = 0; i < 35; i++) { // Adjust the length to match data
      dates.push(new Date(now - 2000 - i * 2000));
    }
    return dates;
  };

  // Fake update every 2 seconds (you can modify this logic)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 1);
    }, 20000);

    return () => clearInterval(interval);
  }, [counter]);

  // Loop through data array and update
  useEffect(() => {
    if (increment + range < slicedData.length) {
      setSlicedData(([x, ...slicedData]) => [...slicedData, slicedData[increment + range]]);
    } else {
      setIncrement(0);
      setRange(0);
    }

    setSlicedLabels(([x, ...slicedLabels]) => [...slicedLabels, new Date()]);
  }, [counter]);

  // Chart data for rendering the graph
  const chartData = {
    labels: slicedLabels,
    datasets: [
      {
        data: slicedData,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Real Time Value</h2>
        <Tooltip className="ml-2">
          <div className="text-xs text-center whitespace-nowrap">
            Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a>
          </div>
        </Tooltip>
      </header>

      {/* Chart built with Chart.js 3 */}
      {/* Adjust the height attribute to change the chart height */}
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
