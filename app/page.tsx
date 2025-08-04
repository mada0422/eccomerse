"use client";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "./products";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Product from "./components/Product";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Show fewer products for better layout

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

  const featuredProducts = products.slice(0, 4); // First 4 products as featured

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '80px 40px',
        marginBottom: '80px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '900',
            marginBottom: '24px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Welcome to Eccomerse
          </h1>
          <p style={{
            fontSize: '1.4rem',
            marginBottom: '40px',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            lineHeight: '1.7'
          }}>
            Your premier destination for quality products at unbeatable prices. 
            Discover curated collections, enjoy fast shipping, and experience 
            exceptional customer service that puts you first.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" style={{
              background: '#fff',
              color: '#667eea',
              padding: '16px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            }}>
              Start Shopping
            </Link>
            <Link href="/categories" style={{
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '20px'
          }}>
            Why Choose Eccomerse?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're committed to providing you with the best shopping experience possible
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              icon: "🚚",
              title: "Fast & Free Shipping",
              description: "Free shipping on orders over $50. Get your products delivered in 2-3 business days."
            },
            {
              icon: "🛡️",
              title: "Secure Shopping",
              description: "Your data is protected with bank-level security. Shop with complete confidence."
            },
            {
              icon: "💎",
              title: "Quality Guaranteed",
              description: "All products are carefully selected and quality-tested before reaching you."
            },
            {
              icon: "🎯",
              title: "Best Prices",
              description: "We offer competitive prices and regular deals to save you money."
            },
            {
              icon: "🔄",
              title: "Easy Returns",
              description: "30-day return policy with hassle-free returns and exchanges."
            },
            {
              icon: "💬",
              title: "24/7 Support",
              description: "Our customer service team is always here to help you with any questions."
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    

   

      {/* Testimonials Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            What Our Customers Say
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              name: "Sarah Johnson",
              role: "Fashion Enthusiast",
              rating: "⭐⭐⭐⭐⭐",
              comment: "Amazing quality products and super fast shipping! I love how easy it is to find exactly what I'm looking for."
            },
            {
              name: "Mike Chen",
              role: "Tech Blogger",
              rating: "⭐⭐⭐⭐⭐",
              comment: "The electronics selection is incredible and the prices are unbeatable. Highly recommend!"
            },
            {
              name: "Emma Davis",
              role: "Style Consultant",
              rating: "⭐⭐⭐⭐⭐",
              comment: "Outstanding customer service and beautiful jewelry collection. My go-to online store!"
            }
          ].map((testimonial, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '16px',
                color: '#F59E0B'
              }}>
                {testimonial.rating}
              </div>
              <p style={{
                fontSize: '1.1rem',
                color: '#333',
                lineHeight: '1.6',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                "{testimonial.comment}"
              </p>
              <div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '4px'
                }}>
                  {testimonial.name}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f8faff 0%, #e8f2ff 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a1a1a',
          marginBottom: '16px'
        }}>
          Stay Updated
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '500px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          Subscribe to our newsletter for exclusive deals, new arrivals, and fashion tips
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              minWidth: '300px',
              flex: '1'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Subscribe
          </button>
        </div>
      </section>
    </main>
  );
}
