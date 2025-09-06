'use client';

import { useCartStore } from '@/stores/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-indigo-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center py-4 space-x-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <div>${item.price.toFixed(2)} each</div>
              <div className="mt-2">
                <label htmlFor={`qty-${item.id}`} className="mr-2">
                  Qty:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right font-bold text-xl mt-6">
        Total: ${total.toFixed(2)}
      </div>

      <div className="mt-6 text-right">
        <Link
          href="/checkout"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
