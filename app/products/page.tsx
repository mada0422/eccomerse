"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import Product from "../components/Product";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<any[]>([]);
  const productsPerPage = 12; // Show more products per page

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Dispatch custom event to notify Navigation component
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(setProducts)
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product: any) => {
    setCart((prev: any) => [...prev, product]);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <main className={styles.page}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px' }}>
          All Products
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Browse our complete collection of {products.length} products
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading products...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>
        </div>
      ) : (
        <>
          <div className={styles.products}>
            {paginatedProducts.map((product) => (
              <Product 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                showDescription={true}
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: currentPage === 1 ? '#e6f0fa' : '#0070f3',
                  color: currentPage === 1 ? '#888' : '#fff',
                  fontWeight: 600,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  fontSize: '1rem'
                }}
              >
                Previous
              </button>
              <span style={{ alignSelf: 'center', fontWeight: 600, fontSize: '1.1rem' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: currentPage === totalPages ? '#e6f0fa' : '#0070f3',
                  color: currentPage === totalPages ? '#888' : '#fff',
                  fontWeight: 600,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  fontSize: '1rem'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
} 