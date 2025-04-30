"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the cart data from the API on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Failed to load cart", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id, delta) => {
    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, delta }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      const updatedItem = await response.json();

      // Update the cart with the updated item
      setCart((prev) =>
        prev.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-sm text-gray-600 mb-4">Home / Cart</p>

      {/* Cart Items */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="text-sm text-gray-800">BDT {item.price}</div>

                <div className="flex items-center border rounded">
                  <button
                    className="px-2 py-1 text-lg"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="px-2 py-1 text-lg"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="font-semibold text-gray-700">
                  BDT {item.price * item.quantity}
                </div>
              </div>
            ))
          )}

          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-200">
              ← Return to Shop
            </button>
            <button className="px-4 py-2 bg-black text-white rounded hover:opacity-90">
              Update Cart
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white p-4 rounded shadow space-y-3">
            <h3 className="font-semibold text-lg">Apply Coupon</h3>
            <input
              type="text"
              placeholder="Enter coupon"
              className="w-full border px-3 py-2 rounded text-sm"
            />
            <button className="w-full mt-2 bg-gray-800 text-white py-2 rounded hover:bg-black">
              Apply Coupon
            </button>
          </div>

          {/* Cart Totals */}
          <div className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="font-semibold text-lg mb-2">Cart Total</h3>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>BDT {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>BDT {subtotal}</span>
            </div>
            <button className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
