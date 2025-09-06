'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminProductForm, { ProductFormData } from '@/components/AdminProductForm';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load products from API
  const loadProducts = async () => {
    setLoading(true);
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Save product (Create or Update)
  const handleSave = async (data: ProductFormData) => {
    if (editingProduct) {
      // Update existing
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      // Create new
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    setShowForm(false);
    setEditingProduct(null);
    loadProducts();
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      loadProducts();
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded shadow"
      >
        Add New Product
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="bg-gray-300 mt-10 rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 mb-5">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="border-b mt-10 text-center hover:bg-gray-50"
                  >
                    <td className="p-3">{product.title}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => { setEditingProduct(product); setShowForm(true); }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id!)}
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
      )}

      {/* Animated Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded p-6 w-full max-w-lg shadow-lg"
            >
              <button
                onClick={() => { setShowForm(false); setEditingProduct(null); }}
                className="float-right text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <AdminProductForm product={editingProduct || undefined} onSave={handleSave}>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
