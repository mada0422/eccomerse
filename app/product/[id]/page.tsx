import Image from "next/image";
import Link from "next/link";
import styles from "../../page.module.css";

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <main className={styles.productDetailsWrapper}>
      <Link href="/" className={styles.backBtn}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16L7 10L13 4" stroke="#0070f3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to products
      </Link>
      <div className={styles.productDetailsCard}>
        <Image className={styles.productDetailsImage} src={product.image} alt={product.title} width={360} height={360} />
        <div className={styles.productDetailsInfo}>
          <div className={styles.productDetailsTitle}>{product.title}</div>
          <div className={styles.productDetailsPrice}>${product.price.toFixed(2)}</div>
          <div className={styles.productDetailsCategory}>{product.category}</div>
          <div className={styles.productDetailsDesc}>{product.description}</div>
          <button className={styles.productDetailsAddBtn}>Add to Cart</button>
        </div>
      </div>
    </main>
  );
}