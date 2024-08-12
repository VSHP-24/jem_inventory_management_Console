const CATEGORIES_URL = `http://127.0.0.1:8000/api/v1/category`;

/////////////////////////////////////////////////
//           FETCHES ALL THE CATEGORIES
/////////////////////////////////////////////////

export async function getCategories() {
  const res = await fetch(CATEGORIES_URL);
  const data = await res.json();
  return data.data.categories;
}

/////////////////////////////////////////////////
//           CREATE NEW CATEGORIES
/////////////////////////////////////////////////

export async function createCategory(newCategory) {
  const res = await fetch(CATEGORIES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
