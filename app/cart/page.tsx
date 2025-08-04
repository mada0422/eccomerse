"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className={styles.cartPage}>
      <header className={styles.cartHeader}>
        <div className={styles.cartTitle}>Your Cart</div>
        <Link className={styles.cartLink} href="/">Back to Store</Link>
      </header>
      {cart.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartList}>
          {cart.map((item, idx) => (
            <div key={idx} className={styles.cartItemRow}>
              {item.image && (
                <Image className={styles.cartItemImage} src={item.image} alt={item.title || item.name} width={64} height={64} />
              )}
              <div className={styles.cartItemInfo}>
                <div className={styles.cartItemName}>{item.title || item.name}</div>
                <div className={styles.cartItemPrice}>${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
          <div className={styles.cartTotal}>Total: ${total.toFixed(2)}</div>
          <button className={styles.checkoutBtn}>Checkout</button>
        </div>
      )}
    </main>
  );
}