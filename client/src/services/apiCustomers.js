import { CUSTOMERS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE CUSTOMERS
/////////////////////////////////////////////////

export async function getCustomers() {
  const res = await fetch(CUSTOMERS_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data.data.data;
}
