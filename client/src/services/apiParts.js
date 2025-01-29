import { PARTS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE PARTS
/////////////////////////////////////////////////

export async function getParts() {
  const res = await fetch(PARTS_URL);
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE / EDIT PARTS
/////////////////////////////////////////////////

export async function createEditPart(newPart) {
  let res;

  ///////////////////////////
  //      CREATE PART
  ///////////////////////////
  if (!newPart._id) {
    res = await fetch(PARTS_URL, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPart),
    });
  }
  ///////////////////////////
  //      EDIT PART
  ///////////////////////////
  else {
    const { products, ...part } = newPart;

    res = await fetch(`${PARTS_URL}/${newPart._id}`, {
      mode: "cors",
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...part }),
    });
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PART
/////////////////////////////////////////////////

export async function deletePart(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${PARTS_URL}/${id}`, {
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
