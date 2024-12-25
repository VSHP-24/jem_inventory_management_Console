import { USERS_URL } from "./apiLinks";

/////////////////////////////////////////////////
//           FETCHES ALL THE USERS
/////////////////////////////////////////////////

export async function getUsers() {
  const res = await fetch(USERS_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           EDIT A USER
/////////////////////////////////////////////////

export async function editUser(updatedUser) {
  const res = await fetch(`${USERS_URL}/${updatedUser._id}`, {
    mode: "cors",
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           DELETE A USER
/////////////////////////////////////////////////

export async function deleteUser(id) {
  const updateDeletedStatus = {
    id,
    active: false,
  };
  const res = await fetch(`${USERS_URL}/${id}`, {
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
