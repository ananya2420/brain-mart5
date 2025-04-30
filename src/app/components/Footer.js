
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function Footer() {
  const [footerImages, setFooterImages] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchFooterImages() {
      const response = await fetch("/api/footer-images");
      const data = await response.json();
      setFooterImages(data);
    }
    fetchFooterImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/footer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message); // Show the response message from the API
      setEmail(""); // Reset the email input
    } catch (error) {
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Subscription section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">BrainMart</h2>
          <p className="mb-4">Subscribe and enter your email</p>

          <form onSubmit={handleSubmit} className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md focus:outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>

          {message && <p className="text-sm text-center text-gray-400">{message}</p>}

          <div className="text-sm">
            <p>Support: 30/1, Road Gandaria, Dhaka</p>
            <p>Email: brainmart@gmail.com</p>
            <p>Phone: +880...</p>
          </div>
        </div>

        {/* Other footer sections */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Account</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">My Account</a></li>
            <li><a href="#" className="hover:text-white">Login</a></li>
            <li><a href="#" className="hover:text-white">Cart</a></li>
            <li><a href="#" className="hover:text-white">MishList</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick links</h3>
          <ul className="space-y-2">
            <li><a href='#' className="hover:text-white">Privacy Policy</a></li>
            <li><a href='#' className="hover:text-white">Teams of use</a></li>
            <li><a href='#' className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4 mb-6">
            {footerImages.map((image) => (
              <a key={image.id} href={image.url} target="_blank" rel="noopener noreferrer">
                <Image src={image.src} alt={image.alt} width={24} height={24} />
              </a>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Download app</h4>
         <div className="flex space-x-4">
              <a href='#'><Image src="/images/google play.png" alt="Google Play" width={120} height={40} /></a>
              <a href='#'><Image src="/images/appstore.png" alt="App Store" width={120} height={40} /></a>
            </div> 
          </div>

          <div className="text-center text-gray-500 text-sm mt-8">
            @{new Date().getFullYear()} BrainMart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;