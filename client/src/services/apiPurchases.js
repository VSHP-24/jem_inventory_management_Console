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
