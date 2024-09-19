import { CATEGORIES_URL } from "./apiLinks";

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

/////////////////////////////////////////////////
//           DELETE A CATEGORY
/////////////////////////////////////////////////

export async function deleteCategory(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${CATEGORIES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
