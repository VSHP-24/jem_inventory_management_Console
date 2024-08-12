const MODELS_URL = `http://127.0.0.1:8000/api/v1/bikes`;

/////////////////////////////////////////////////
//           FETCHES ALL THE MODELS
/////////////////////////////////////////////////

export async function getModels() {
  const res = await fetch(MODELS_URL);
  const data = await res.json();
  return data.data.bikes;
}

/////////////////////////////////////////////////
//           CREATE NEW MODEL
/////////////////////////////////////////////////

export async function createModel(newModel) {
  const res = await fetch(MODELS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newModel),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
