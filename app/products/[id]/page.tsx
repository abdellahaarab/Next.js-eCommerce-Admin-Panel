'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import Link from 'next/link';

type Params = {
  params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: Params) {
  const unwrappedParams = React.use(params); // unwrap the params Promise
  const productId = parseInt(unwrappedParams.id, 10);

  const product = products.find((p) => p.id === productId);
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  if (!product) return <p className="text-center p-6">Product not found</p>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
  };

  // Related products: same category, exclude current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Main Product */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto object-contain rounded shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded text-white transition ${
              added ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {added ? 'Added to Cart ✅' : 'Add to Cart'}
          </button>

          <Link
            href="/cart"
            className="mt-4 text-indigo-600 hover:underline font-medium"
          >
            Go to Cart
          </Link>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded p-4 flex flex-col items-center text-center transition-shadow hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-32 h-32 object-contain mb-4 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-green-600 font-bold mb-2">${p.price}</p>
                <Link
                  href={`/products/${p.id}`}
                  className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
