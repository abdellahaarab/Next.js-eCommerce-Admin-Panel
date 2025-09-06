'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold">My Shop</h1>
      </Link>

      <Link href="/cart" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.1a1 1 0 001 1.2h12a1 1 0 001-1.2L17 13M7 13l-4-8"
          />
        </svg>

        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
            {totalQuantity}
          </span>
        )}
      </Link>
    </nav>
  );
}
