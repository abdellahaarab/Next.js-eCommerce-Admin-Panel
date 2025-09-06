'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Mock Orders Data
const initialOrders = [
  { id: 1, customer: 'Alice', total: 120, status: 'Pending' },
  { id: 2, customer: 'Bob', total: 80, status: 'Completed' },
  { id: 3, customer: 'Charlie', total: 50, status: 'Pending' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setOrders(
      orders.map(o =>
        o.id === id ? { ...o, status: o.status === 'Pending' ? 'Completed' : 'Pending' } : o
      )
    );
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.map(order => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">${order.total}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                      } cursor-pointer`}
                      onClick={() => toggleStatus(order.id)}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
