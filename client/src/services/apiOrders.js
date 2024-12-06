import { ORDERS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE ORDERS
/////////////////////////////////////////////////

export async function getOrders() {
  const res = await fetch(ORDERS_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           EDIT ORDERS
/////////////////////////////////////////////////

export async function editOrders(orderData) {
  if (
    orderData.orderStatus !==
    orderData.orderStatusUpdateOn[orderData.orderStatusUpdateOn.length - 1]
      .updatedStatus
  ) {
    const StatusUpdateOn = {
      updatedStatus: orderData.orderStatus,
      updatedOn: Date.now(),
    };

    orderData.orderStatusUpdateOn.push(StatusUpdateOn);
  }
  const res = await fetch(`${ORDERS_URL}/${orderData._id}`, {
    mode: "cors",
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A ORDER
/////////////////////////////////////////////////

export async function deleteOrder(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${ORDERS_URL}/${id}`, {
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
