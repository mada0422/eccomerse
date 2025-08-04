"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Navigation() {
  const [cart, setCart] = useState<any[]>([]);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="20" height="12" rx="4" fill="#0070f3"/>
            <rect x="6" y="2" width="12" height="20" rx="4" fill="#00c6ff"/>
          </svg>
          Eccomerse
        </div>
        <nav className={styles.nav}>
          <Link className={styles.cartLink} href="/cart">Cart ({cart.length})</Link>
        </nav>
      </header>
      
      <nav className={styles.menu}>
        <Link href="/" className={styles.menuItem}>Home</Link>
        <Link href="/products" className={styles.menuItem}>Products</Link>
        <Link href="/categories" className={styles.menuItem}>Categories</Link>
        <Link href="/about" className={styles.menuItem}>About</Link>
        <Link href="/contact" className={styles.menuItem}>Contact</Link>
      </nav>
    </>
  );
} 