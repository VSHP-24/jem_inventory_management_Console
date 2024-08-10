const PRODUCTS_URL = `http://127.0.0.1:8000/api/v1/products`;

/////////////////////////////////////////////////
//           FETCHES ALL THE PRODUCTS
/////////////////////////////////////////////////

export async function getProducts() {
  const res = await fetch(PRODUCTS_URL);
  const data = await res.json();
  return data.data.products;
}

/////////////////////////////////////////////////
//           CREATE NEW PRODUCT
/////////////////////////////////////////////////

export async function createProduct(newProduct) {
  const res = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) throw new Error(data.message);
}
