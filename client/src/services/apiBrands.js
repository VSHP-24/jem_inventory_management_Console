const BRANDS_URL = `http://127.0.0.1:8000/api/v1/brands`;

/////////////////////////////////////////////////
//           FETCHES ALL THE BRANDS
/////////////////////////////////////////////////

export async function getBrands() {
  const res = await fetch(BRANDS_URL);
  const data = await res.json();
  return data.data.brands;
}

/////////////////////////////////////////////////
//           CREATE NEW BRAND
/////////////////////////////////////////////////

export async function createBrand(newBrand) {
  const res = await fetch(BRANDS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBrand),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
