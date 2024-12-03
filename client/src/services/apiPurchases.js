import { PURCHASES_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE PURCHASES
/////////////////////////////////////////////////

export async function getPurchases() {
  const res = await fetch(PURCHASES_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE NEW PURCHASE
/////////////////////////////////////////////////

export async function createEditPurchase(newPurchase) {
  let res;

  ///////////////////////////
  //    CREATE PURCHASE
  ///////////////////////////
  if (!newPurchase._id) {
    const StatusUpdateOn = {
      updatedStatus: newPurchase.status,
      updatedOn: Date.now(),
    };

    newPurchase.orderStatusUpdateOn = [StatusUpdateOn];

    res = await fetch(PURCHASES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPurchase),
    });
  }

  /////////////////////////
  //  EDIT PURCHASE
  /////////////////////////
  else {
    if (
      newPurchase.status !==
      newPurchase.orderStatusUpdateOn[
        newPurchase.orderStatusUpdateOn.length - 1
      ].updatedStatus
    ) {
      const StatusUpdateOn = {
        updatedStatus: newPurchase.status,
        updatedOn: Date.now(),
      };

      newPurchase.orderStatusUpdateOn.push(StatusUpdateOn);
    }

    res = await fetch(`${PURCHASES_URL}/${newPurchase._id}`, {
      mode: "cors",
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPurchase),
    });
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PURCHASE
/////////////////////////////////////////////////

export async function deletePurchase(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${PURCHASES_URL}/${id}`, {
    mode: "cors",
    credentials: "include",
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
