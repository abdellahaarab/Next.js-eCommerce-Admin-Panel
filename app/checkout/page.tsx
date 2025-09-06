'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !address) {
      setMessage('Please fill all fields.');
      return;
    }

    setMessage('Redirecting to payment...');

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (data.url) {
        clearCart();
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        setMessage('Failed to create checkout session.');
      }
    } catch {
      setMessage('Error during checkout.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <ul className="mb-6 divide-y">
        {cart.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="text-right font-semibold mb-6">Total: ${total.toFixed(2)}</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Shipping Address"
          className="w-full border px-3 py-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Pay Now
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
