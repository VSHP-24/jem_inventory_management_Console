const PARTS_URL = `http://127.0.0.1:8000/api/v1/parts`;

/////////////////////////////////////////////////
//           FETCHES ALL THE PARTS
/////////////////////////////////////////////////

export async function getParts() {
  const res = await fetch(PARTS_URL);
  const data = await res.json();
  return data.data.parts;
}
