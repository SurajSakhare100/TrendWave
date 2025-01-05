import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "@/lib";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    topProducts: [],
    ordersByStatus: [],
    averageOrderValue: 0,
    userGrowth: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const revenueRes = await axios.get(`${url}/admin/analytics/revenue`,{withCredentials:true});
        const ordersRes = await axios.get(`${url}/admin/analytics/orders`,{withCredentials:true});
        const usersRes = await axios.get(`${url}/admin/analytics/users`,{withCredentials:true});
        const productsRes = await axios.get(`${url}/admin/analytics/top-products`,{withCredentials:true});
        const statusRes = await axios.get(`${url}/admin/analytics/orders-status`,{withCredentials:true});
        const averageOrderRes = await axios.get(`${url}/admin/analytics/average-order`,{withCredentials:true});
        const userGrowthRes = await axios.get(`${url}/admin/analytics/user-growth`,{withCredentials:true});
        setAnalytics({
          totalRevenue: revenueRes.data.totalRevenue,
          totalOrders: ordersRes.data.totalOrders,
          totalUsers: usersRes.data.totalUsers,
          topProducts: productsRes.data.topSellingProducts,
          ordersByStatus: statusRes.data.ordersByStatus,
          averageOrderValue: averageOrderRes.data.averageOrderValue,
          userGrowth: userGrowthRes.data.userGrowth,
        });
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };

    fetchAnalytics();
  }, []);

  // Chart data configurations
  const ordersStatusData = {
    labels: analytics.ordersByStatus.map((status) => status._id),
    datasets: [
      {
        label: "Orders by Status",
        data: analytics.ordersByStatus.map((status) => status.count),
        backgroundColor: analytics.ordersByStatus.map((status) => {
          if (status._id === 'rejected') {
            return '#f44336'; // Red for rejected
          } else if (status._id === 'confirmed') {
            return '#4caf50'; // Green for confirmed
          } else if (status._id === 'inProcess') {
            return '#ff9800'; // Orange for in process
          } else if (status._id === 'pending') {
            return '#2196f3'; // Blue for pending
          } else if (status._id === 'inShipping') {
            return '#ffeb3b'; // Yellow for in shipping
          } else if (status._id === 'delivered') {
            return '#8e24aa'; // Purple for delivered
          } else {
            return '#9e9e9e'; // Grey for unknown statuses
          }
        }),
        borderWidth: 1,
      },
    ],
  };
  
  

  const userGrowthData = {
    labels: analytics.userGrowth.map((growth) => growth._id),
    datasets: [
      {
        label: "User Growth",
        data: analytics.userGrowth.map((growth) => growth.count),
        fill: false,
        borderColor: "#4caf50",
        tension: 0.1,
      },
    ],
  };

  const topProductsData = {
    labels: analytics.topProducts.map((product) => product.title),
    datasets: [
      {
        label: "Top Products",
        data: analytics.topProducts.map((product) => product.totalStock),
        backgroundColor: "#2196f3",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Analytics Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="border text-black shadow-md rounded-lg p-6 text-center ">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-3xl font-bold">${analytics.totalRevenue}</p>
        </div>
        <div className="border shadow-md rounded-lg p-6 text-center text-black">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold">{analytics.totalOrders}</p>
        </div>
        <div className="border shadow-md rounded-lg p-6 text-center text-black">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">{analytics.totalUsers}</p>
        </div>
      </div>

      {/* Charts in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders by Status</h2>
          <Pie data={ordersStatusData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Growth Over Time</h2>
          <Line data={userGrowthData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          <Bar data={topProductsData} />
        </div>
      </div>

      {/* Average Order Value */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Average Order Value</h2>
        <p className="text-2xl font-bold text-indigo-500">${analytics?.averageOrderValue?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Analytics;
