const SUBCATEGORIES_URL = `http://127.0.0.1:8000/api/v1/subcategory`;

/////////////////////////////////////////////////
//           FETCHES ALL THE SUBCATEGORIES
/////////////////////////////////////////////////

export async function getSubCategories() {
  const res = await fetch(SUBCATEGORIES_URL);
  const data = await res.json();
  return data.data.subCategories;
}
