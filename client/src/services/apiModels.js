import { MODELS_URL } from "./apiLinks";

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

/////////////////////////////////////////////////
//           DELETE A MODEL
/////////////////////////////////////////////////

export async function deleteModel(id) {
  const updateDeletedStatus = {
    isDeleted: true,
  };
  const res = await fetch(`${MODELS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDeletedStatus),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}
