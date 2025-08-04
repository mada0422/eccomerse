"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    description?: string;
  };
  onAddToCart: (product: any) => void;
  showDescription?: boolean;
}

export default function Product({ product, onAddToCart, showDescription = false }: ProductProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    onAddToCart(product);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: isHovered 
          ? '0 12px 40px rgba(0,112,243,0.15), 0 4px 20px rgba(0,0,0,0.08)' 
          : '0 4px 20px rgba(0,0,0,0.06)',
        padding: '24px 20px 32px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'none',
        width: '280px',
        cursor: 'pointer',
        border: '1px solid rgba(0,112,243,0.05)'
      }}
    >
      {/* Price Badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: '700',
        zIndex: 2,
        boxShadow: '0 2px 8px rgba(0,112,243,0.3)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s'
      }}>
        ${product.price.toFixed(2)}
      </div>

      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        marginBottom: '20px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8faff 0%, #f0f8ff 100%)',
        padding: '16px'
      }}>
        <Image 
          src={product.image} 
          alt={product.title} 
          width={220} 
          height={220} 
          style={{ 
            objectFit: "contain",
            width: '100%',
            height: 'auto',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }} 
        />
      </div>

      {/* Content */}
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Link 
          href={`/product/${product.id}`} 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'block'
          }}
        >
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: '#1a1a1a',
            lineHeight: '1.3',
            minHeight: '2.6rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.title}
          </h2>
        </Link>

        {showDescription && product.description && (
          <p style={{
            fontSize: '0.9rem',
            color: '#666',
            marginBottom: '16px',
            lineHeight: '1.4',
            minHeight: '2.8rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description}
          </p>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          style={{
            background: isAddingToCart 
              ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
              : 'linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: isAddingToCart ? 'default' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0,112,243,0.2)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (!isAddingToCart) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,112,243,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isAddingToCart) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,112,243,0.2)';
            }
          }}
        >
          {isAddingToCart ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,112,243,0.02) 0%, rgba(0,198,255,0.02) 100%)',
          pointerEvents: 'none',
          borderRadius: '20px'
        }} />
      )}
    </div>
  );
} 