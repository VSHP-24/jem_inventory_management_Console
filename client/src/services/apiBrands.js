import { BRANDS_URL } from "./apiLinks";

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

/////////////////////////////////////////////////
//           DELETE A BRAND
/////////////////////////////////////////////////

export async function deleteBrand(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${BRANDS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
