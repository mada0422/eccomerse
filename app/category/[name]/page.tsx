"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "../../page.module.css";
import Product from "../../components/Product";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.name as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((allProducts) => {
        // Log all unique categories to see what we're working with
        const uniqueCategories = [...new Set(allProducts.map((p: Product) => p.category))];
        console.log("Available categories from API:", uniqueCategories);
        console.log("Looking for category:", categoryName);
        
        // Create a mapping for category name variations
        const categoryMapping: { [key: string]: string } = {
          "men's clothing": "men's clothing",
          "women's clothing": "women's clothing", 
          "jewelery": "jewelery",
          "electronics": "electronics",
          "mens-clothing": "men's clothing",
          "womens-clothing": "women's clothing",
          "jewelry": "jewelery"
        };

        // Get the normalized category name
        const normalizedCategoryName = categoryMapping[categoryName.toLowerCase()] || categoryName.toLowerCase();
        
        // Filter products by category with more flexible matching
        const categoryProducts = allProducts.filter((product: Product) => {
          const productCategory = product.category.toLowerCase();
          const targetCategory = normalizedCategoryName.toLowerCase();
          
          console.log(`Comparing: "${productCategory}" with "${targetCategory}"`);
          
          return productCategory === targetCategory;
        });
        
        console.log(`Found ${categoryProducts.length} products for category: ${categoryName}`);
        setProducts(categoryProducts);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const addToCart = (product: Product) => {
    setCart((prev: any) => [...prev, product]);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Category display names and colors
  const categoryInfo = {
    "men's clothing": { displayName: "Men's Clothing", color: "#3B82F6", icon: "👔" },
    "women's clothing": { displayName: "Women's Clothing", color: "#EC4899", icon: "👗" },
    "jewelery": { displayName: "Jewelry", color: "#F59E0B", icon: "💎" },
    "electronics": { displayName: "Electronics", color: "#10B981", icon: "📱" }
  };

  const currentCategory = categoryInfo[categoryName.toLowerCase() as keyof typeof categoryInfo] || 
    { displayName: categoryName, color: "#667eea", icon: "📦" };

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${currentCategory.color} 0%, ${currentCategory.color}dd 100%)`,
        borderRadius: '24px',
        padding: '80px 40px',
        marginBottom: '60px',
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
          <div style={{
            fontSize: '4rem',
            marginBottom: '20px'
          }}>
            {currentCategory.icon}
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {currentCategory.displayName}
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '0',
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover our amazing collection of {currentCategory.displayName.toLowerCase()}. 
            {products.length} products available in this category.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.95rem',
            color: '#666'
          }}>
            <Link href="/" style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Categories
            </Link>
            <span>/</span>
            <span style={{ color: '#333', fontWeight: '600' }}>
              {currentCategory.displayName}
            </span>
          </nav>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Results Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '8px'
              }}>
                {currentCategory.displayName} Products
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#666'
              }}>
                Showing {paginatedProducts.length} of {products.length} products
              </p>
            </div>
            <Link href="/categories" style={{
              background: 'rgba(255,255,255,0.9)',
              color: currentCategory.color,
              padding: '12px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: `2px solid ${currentCategory.color}20`,
              transition: 'all 0.3s ease'
            }}>
              ← Back to Categories
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <div style={{ fontSize: '1.4rem', color: '#666', marginBottom: '24px' }}>
                Loading {currentCategory.displayName} products...
              </div>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                border: '4px solid #f3f3f3', 
                borderTop: `4px solid ${currentCategory.color}`, 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite', 
                margin: '0 auto' 
              }}></div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'red', fontSize: '1.3rem' }}>{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📦</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '12px'
              }}>
                No Products Found
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '24px'
              }}>
                No products available in this category at the moment.
              </p>
              <Link href="/categories" style={{
                background: `linear-gradient(135deg, ${currentCategory.color} 0%, ${currentCategory.color}dd 100%)`,
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem'
              }}>
                Browse Other Categories
              </Link>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '32px',
                marginBottom: '60px'
              }}>
                {paginatedProducts.map((product) => (
                  <Product 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    showDescription={true}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '60px'
                }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      background: currentPage === 1 ? '#f0f0f0' : '#fff',
                      color: currentPage === 1 ? '#999' : '#333',
                      border: '1px solid #ddd',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Previous
                  </button>
                  
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          background: page === currentPage ? currentCategory.color : '#fff',
                          color: page === currentPage ? '#fff' : '#333',
                          border: `1px solid ${page === currentPage ? currentCategory.color : '#ddd'}`,
                          padding: '12px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          minWidth: '40px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    style={{
                      background: currentPage === totalPages ? '#f0f0f0' : '#fff',
                      color: currentPage === totalPages ? '#999' : '#333',
                      border: '1px solid #ddd',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
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