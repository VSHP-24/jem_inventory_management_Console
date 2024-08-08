export async function getProducts() {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/products`);
  const data = await res.json();
  return data.data.products;
}
