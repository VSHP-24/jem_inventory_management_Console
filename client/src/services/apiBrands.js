import { BRANDS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE BRANDS
/////////////////////////////////////////////////

export async function getBrands() {
  const res = await fetch(BRANDS_URL);
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE / EDIT BRAND
/////////////////////////////////////////////////

export async function createEditBrand(newBrand) {
  let res;

  ///////////////////////////
  //      CREATE BRAND
  ///////////////////////////

  if (!newBrand._id) {
    res = await fetch(BRANDS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    });
  }

  ///////////////////////////
  //      EDIT BRAND
  ///////////////////////////
  else {
    res = await fetch(`${BRANDS_URL}/${newBrand._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A BRAND
/////////////////////////////////////////////////

export async function deleteBrand(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${BRANDS_URL}/${id}`, {
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
