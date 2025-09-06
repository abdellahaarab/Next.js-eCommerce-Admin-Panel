'use client';

import { useAdminAuth } from '@/hooks/useAdminAuth';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBoxOpen, FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar
} from 'recharts';
import { PlusCircleIcon, ClipboardIcon, UsersIcon } from '@heroicons/react/24/outline';


export default function AdminDashboard() {
    // const { session, status } = useAdminAuth();
    // Auth log in Google
    // if (status === "loading") return <p>Loading...</p>;
    // if (!session) return null; // redirected automatically

  // Mock stats
  const stats = [
    { id: 1, title: 'Products', value: 128, icon: <FaBoxOpen size={24} className="text-white" />, link: '/admin/products' },
    { id: 2, title: 'Orders', value: 56, icon: <FaShoppingCart size={24} className="text-white" />, link: '/admin/orders' },
    { id: 3, title: 'Customers', value: 89, icon: <FaUsers size={24} className="text-white" />, link: '/admin/customers' },
    { id: 4, title: 'Revenue', value: 12450, icon: <FaDollarSign size={24} className="text-white" />, link: '/admin/revenue' },
  ];

  // Mock chart data (you can fetch real data from API)
  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4000 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 7000 },
  ]);

  const [ordersData, setOrdersData] = useState([
    { month: 'Jan', orders: 20 },
    { month: 'Feb', orders: 15 },
    { month: 'Mar', orders: 25 },
    { month: 'Apr', orders: 18 },
    { month: 'May', orders: 28 },
    { month: 'Jun', orders: 35 },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueData((prev) =>
        prev.map((d) => ({ ...d, revenue: d.revenue + Math.floor(Math.random() * 500 - 250) }))
      );
      setOrdersData((prev) =>
        prev.map((d) => ({ ...d, orders: d.orders + Math.floor(Math.random() * 5 - 2) }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Admin Dashboard
       
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Link href={stat.link}>
              <div className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg p-6 flex items-center space-x-4 transition-transform transform hover:scale-105">
                <div className="p-3 bg-indigo-800 rounded-full">{stat.icon}</div>
                <div>
                  <p className="text-lg font-semibold">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions */}
       <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-12 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link href="/admin/products/new" passHref>
          <div className="bg-green-500 hover:bg-green-600 text-black rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <PlusCircleIcon className="h-10 w-10 mb-3" />
            Add New Product
          </div>
        </Link>

        <Link href="/admin/orders" passHref>
          <div className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <ClipboardIcon className="h-10 w-10 mb-3" />
            View Orders
          </div>
        </Link>

        <Link href="/admin/customers" passHref>
          <div className="bg-pink-500 hover:bg-pink-600 text-black rounded-lg p-6 text-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center">
            <UsersIcon className="h-10 w-10 mb-3" />
            Manage Customers
          </div>
        </Link>

      </div>
    </motion.div>
    </div>
  );
}



