'use client';

import { useEffect, useState } from 'react';
import AdminProductForm from '@/components/AdminProductForm';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductFormData } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load products from API
  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  }; 

  useEffect(() => {
    loadProducts();
  }, []);

  // Save (Add/Edit) product
  const handleSave = async (product: ProductFormData) => {
    try { 
      let res;
      if (product.id) {
        // Edit existing product
        res = await fetch(`/api/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
      } else {
        // Add new product
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
          
        });
      }
      const savedProduct = await res.json();
      loadProducts();
      setShowForm(false);
      setEditingProduct(null);  
        } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  // Delete product
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <motion.button
        onClick={() => { setEditingProduct(null); setShowForm(true); }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        whileHover={{ scale: 1.05 }}
      >
        Add New Product
      </motion.button>

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

              <AdminProductForm
                product={editingProduct || undefined}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditingProduct(null); }}   
              />
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {products.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border rounded p-4 shadow"
          >
            <img src={p.image} alt={p.title} className="h-40 w-full object-contain mb-2" />
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-green-600">${p.price}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => { setEditingProduct(p); setShowForm(true); }}
                className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(p.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
