const BRANDS_URL = `http://127.0.0.1:8000/api/v1/brands`;

/////////////////////////////////////////////////
//           FETCHES ALL THE BRANDS
/////////////////////////////////////////////////

export async function getBrands() {
  const res = await fetch(BRANDS_URL);
  const data = await res.json();
  return data.data.brands;
}
