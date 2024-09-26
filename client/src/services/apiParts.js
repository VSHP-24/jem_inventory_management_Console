import { PARTS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE PARTS
/////////////////////////////////////////////////

export async function getParts() {
  const res = await fetch(PARTS_URL);
  const data = await res.json();
  return data.data.parts;
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
    res = await fetch(`${PARTS_URL}/${newPart._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPart),
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
    isDeleted: true,
  };
  const res = await fetch(`${PARTS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
