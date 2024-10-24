"use client";

import React, { useState } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpg";

const ProductHomePage: React.FC = () => {
  const products = [
    { name: "Scariest Costume Ever", price: 19.99, image: image1 },
    { name: "Puts Fear In The Hearts Of People", price: 19.99, image: image2 },
    { name: "Nightmare Fuel", price: 19.99, image: image3 },
  ];
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setEmail("");
  };
  return (
    <div className="halloween-store">
      <nav className="navbar">
        <h1 className="spooky-title">Spooky Costume Emporium</h1>
        <div className="navBarLinks">
          <p>products</p>
          <p>about</p>
          <p>contact</p>
        </div>
      </nav>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.name} className="product-card">
            <div>
              <img
                className="productImage"
                src={
                  typeof product.image === "string" ?
                    product.image
                  : product.image.src
                }
                alt={product.name}
              />
            </div>
            <h1>{product.name}</h1>
            <h2>${product.price.toFixed(2)}</h2>
          </div>
        ))}
      </div>
      <button className="buy-button">Shop Now</button>
      <div className="newsletter-signup">
        <h2>Sign up for spooky updates!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default ProductHomePage;
