import { PURCHASES_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE PURCHASES
/////////////////////////////////////////////////

export async function getPurchases() {
  const res = await fetch(PURCHASES_URL);
  const data = await res.json();
  return data.data.purchases;
}

/////////////////////////////////////////////////
//           CREATE NEW PURCHASE
/////////////////////////////////////////////////

export async function createPurchase(newPurchase) {
  let res;

  ///////////////////////////
  //    CREATE PURCHASE
  ///////////////////////////
  if (!newPurchase._id) {
    res = await fetch(PURCHASES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPurchase),
    });
  }

  ///////////////////////////
  //    EDIT PURCHASE
  ///////////////////////////
  //   else {
  //     res = await fetch(`${PRODUCTS_URL}/${newProduct._id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newProduct),
  //     });
  //   }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PURCHASE
/////////////////////////////////////////////////

export async function deletePurchase(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${PURCHASES_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
