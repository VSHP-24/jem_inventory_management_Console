import { SUBCATEGORIES_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE SUBCATEGORIES
/////////////////////////////////////////////////

export async function getSubCategories() {
  const res = await fetch(SUBCATEGORIES_URL);
  const data = await res.json();
  return data.data.subCategories;
}

/////////////////////////////////////////////////
//           CREATE NEW SUBCATEGORIES
/////////////////////////////////////////////////

export async function createSubCategory(newSubCategory) {
  const res = await fetch(SUBCATEGORIES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSubCategory),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
