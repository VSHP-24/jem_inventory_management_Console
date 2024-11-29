import { SUBCATEGORIES_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE SUBCATEGORIES
/////////////////////////////////////////////////

export async function getSubCategories() {
  const res = await fetch(SUBCATEGORIES_URL);
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE / EDIT SUBCATEGORIES
/////////////////////////////////////////////////

export async function createEditSubCategory(newSubCategory) {
  let res;

  ///////////////////////////
  //    CREATE SUBCATEGORY
  ///////////////////////////
  if (!newSubCategory._id) {
    res = await fetch(SUBCATEGORIES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubCategory),
    });
  }

  ///////////////////////////
  //    EDIT SUBCATEGORY
  ///////////////////////////
  else {
    res = await fetch(`${SUBCATEGORIES_URL}/${newSubCategory._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubCategory),
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A SUBCATEGORY
/////////////////////////////////////////////////

export async function deleteSubCategory(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${SUBCATEGORIES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
