import { MODELS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE MODELS
/////////////////////////////////////////////////

export async function getModels() {
  const res = await fetch(MODELS_URL);
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           CREATE / EDIT MODEL
/////////////////////////////////////////////////

export async function createEditModel(newModel) {
  let res;

  ///////////////////////////
  //    CREATE MODEL
  ///////////////////////////
  if (!newModel._id) {
    res = await fetch(MODELS_URL, {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    });
  }

  ///////////////////////////
  //    EDIT MODEL
  ///////////////////////////
  else {
    const { products, ...model } = newModel;

    res = await fetch(`${MODELS_URL}/${newModel._id}`, {
      mode: "cors",
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...model }),
    });
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A MODEL
/////////////////////////////////////////////////

export async function deleteModel(id) {
  const updateDeletedStatus = {
    id,
    isDeleted: true,
  };
  const res = await fetch(`${MODELS_URL}/${id}`, {
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
