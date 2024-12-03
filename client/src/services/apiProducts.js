import { PRODUCTS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE PRODUCTS
/////////////////////////////////////////////////

export async function getProducts() {
  const res = await fetch(PRODUCTS_URL);
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE NEW PRODUCT
/////////////////////////////////////////////////

export async function createEditProduct(newProduct) {
  let res;

  ///////////////////////////
  //    CREATE PRODUCT
  ///////////////////////////
  if (!newProduct._id) {
    res = await fetch(PRODUCTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  }

  ///////////////////////////
  //    EDIT PRODUCT
  ///////////////////////////
  else {
    res = await fetch(`${PRODUCTS_URL}/${newProduct._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PRODUCT
/////////////////////////////////////////////////

export async function deleteProduct(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  if (res.ok) return;
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
