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
//           CREATE NEW PART
/////////////////////////////////////////////////

export async function createPart(newPart) {
  const res = await fetch(PARTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPart),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A PART
/////////////////////////////////////////////////

export async function deletePart(id) {
  const res = await fetch(`${PARTS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(res.statusText);
}
