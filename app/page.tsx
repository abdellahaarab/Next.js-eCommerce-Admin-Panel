import { products } from '@/data/products';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to MyStore</h1>
        <p className="text-lg text-white/80 max-w-xl mx-auto">
          Discover the best products in fashion, electronics, and more.
        </p>
        <Link href="/products">
          <button className="mt-8 px-6 py-3 bg-white text-purple-700 font-semibold rounded hover:bg-gray-100 transition">
            Browse Products
          </button>
        </Link>
      </section>

      <section className="bg-white text-gray-800 px-6 py-16 rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-md p-4 transition hover:shadow-xl"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="font-bold text-green-600 mb-3">${product.price}</p>
              <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
              <Link href={`/products/${product.id}`}>
                <button className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
