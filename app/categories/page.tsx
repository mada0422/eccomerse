"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

interface Category {
  name: string;
  image: string;
  count: number;
  description: string;
  color: string;
  icon: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Fetch categories from the API
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then(async (categoryNames) => {
        // Create category objects with additional data
        const categoryData: Category[] = [
          {
            name: "men's clothing",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            count: 4,
            description: "Discover stylish and comfortable clothing designed for the modern man. From casual wear to formal attire, find your perfect style.",
            color: "#3B82F6",
            icon: "👔"
          },
          {
            name: "women's clothing",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
            count: 6,
            description: "Explore trendy fashion pieces that combine style with comfort. From elegant dresses to casual essentials, express your unique personality.",
            color: "#EC4899",
            icon: "👗"
          },
          {
            name: "jewelery",
            image: "https://images.unsplash.com/photo-1515562141207-7e88dc7c2e5f?w=400&h=300&fit=crop",
            count: 4,
            description: "Adorn yourself with beautiful jewelry that tells your story. From delicate pieces to statement accessories, find your perfect complement.",
            color: "#F59E0B",
            icon: "💎"
          },
          {
            name: "electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
            count: 6,
            description: "Stay connected with the latest electronic gadgets and accessories. Quality technology that enhances your daily life.",
            color: "#10B981",
            icon: "📱"
          }
        ];
        setCategories(categoryData);
      })
      .catch(() => setError("Failed to load categories."))
      .finally(() => setLoading(false));
  }, []);

  const [error, setError] = useState("");

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
            Shop by Category
          </h1>
          <p style={{
            fontSize: '1.4rem',
            marginBottom: '0',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Discover our carefully curated collections organized by category. 
            Find exactly what you're looking for with our diverse range of products.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '20px'
          }}>
            Explore Our Collections
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Each category is carefully selected to provide you with the best shopping experience
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div style={{ fontSize: '1.4rem', color: '#666', marginBottom: '24px' }}>Loading categories...</div>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #667eea', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite', 
              margin: '0 auto' 
            }}></div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'red', fontSize: '1.3rem' }}>{error}</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '40px',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                href={`/category/${category.name}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  background: '#fff',
                  borderRadius: '28px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.05)',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                }}
                >
                  {/* Category Image */}
                  <div style={{
                    height: '220px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}08 100%)`
                  }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={300}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    {/* Category Icon Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      {category.icon}
                    </div>
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} />
                  </div>

                  {/* Category Content */}
                  <div style={{
                    padding: '32px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.6rem',
                        fontWeight: '800',
                        color: '#1a1a1a',
                        marginBottom: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {category.name}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#666',
                        marginBottom: '20px',
                        lineHeight: '1.6'
                      }}>
                        {category.description}
                      </p>
                    </div>

                    {/* Category Stats and CTA */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '20px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          color: category.color,
                          fontWeight: '700'
                        }}>
                          {category.count} products
                        </span>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: category.color
                        }} />
                      </div>
                      <div style={{
                        background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                        color: '#fff',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        transition: 'all 0.3s ease'
                      }}>
                        Explore Category
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Category Features Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '20px'
          }}>
            Why Shop by Category?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Our organized categories help you find exactly what you need quickly and efficiently
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              icon: "🎯",
              title: "Easy Navigation",
              description: "Find products quickly with our organized category system"
            },
            {
              icon: "📱",
              title: "Mobile Friendly",
              description: "Browse categories seamlessly on any device"
            },
            {
              icon: "⚡",
              title: "Fast Loading",
              description: "Quick access to category-specific products"
            },
            {
              icon: "🔍",
              title: "Smart Search",
              description: "Filter and search within categories for precise results"
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
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
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

      {/* Call to Action Section */}
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
          Can't Find What You're Looking For?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '500px',
          margin: '0 auto 32px auto',
          lineHeight: '1.6'
        }}>
          Browse all our products or contact our customer service team for assistance
        </p>
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/products" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}>
            View All Products
          </Link>
          <Link href="/contact" style={{
            background: 'rgba(255,255,255,0.8)',
            color: '#667eea',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(102,126,234,0.2)'
          }}>
            Contact Support
          </Link>
        </div>
      </section>

      {/* CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
} 