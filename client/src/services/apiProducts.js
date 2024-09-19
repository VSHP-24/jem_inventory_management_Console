import { PRODUCTS_URL } from "./apiLinks";

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
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PRODUCT
/////////////////////////////////////////////////

export async function deleteProduct(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
