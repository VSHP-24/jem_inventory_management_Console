import {
  FORGOT_PASSWORD_URL,
  GET_USER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  RESET_PASSWORD_URL,
} from "./apiLinks";

/////////////////////////////////////////////////
//           USER LOGIN
/////////////////////////////////////////////////

export async function login({ email, password }) {
  const res = await fetch(LOGIN_URL, {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data.data.user;
}

/////////////////////////////////////////////////
//           GET CURRENT USER DATA
/////////////////////////////////////////////////

export async function getCurrentUser() {
  const res = await fetch(GET_USER_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data.data.data;
}

/////////////////////////////////////////////////
//           USER LOGOUT
/////////////////////////////////////////////////

export async function logout() {
  const res = await fetch(LOGOUT_URL, {
    mode: "cors",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

/////////////////////////////////////////////////
//           USER FORGOT PASSWORD
/////////////////////////////////////////////////

export async function forgotPassword({ email }) {
  const res = await fetch(FORGOT_PASSWORD_URL, {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
}

/////////////////////////////////////////////////
//           USER RESET PASSWORD
/////////////////////////////////////////////////

export async function resetPassword({ password, passwordConfirm }) {
  const currentURL = window.location.href.split("/");
  const resetToken = currentURL[currentURL.length - 1];

  const res = await fetch(`${RESET_PASSWORD_URL}/${resetToken}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, passwordConfirm }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data.data.user;
}
