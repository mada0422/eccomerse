export async function fetchProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  console.log(res);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}