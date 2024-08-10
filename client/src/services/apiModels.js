const MODELS_URL = `http://127.0.0.1:8000/api/v1/bikes`;

/////////////////////////////////////////////////
//           FETCHES ALL THE MODELS
/////////////////////////////////////////////////

export async function getModels() {
  const res = await fetch(MODELS_URL);
  const data = await res.json();
  return data.data.bikes;
}
