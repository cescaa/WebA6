import { jwtDecode } from "jwt-decode";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function readToken() {
  const token = getToken();
  return token ? jwtDecode(token) : null;
}

export function isAuthenticated() {
  const token = readToken();
  return token && Date.now() < token.exp * 1000; // Check if token is valid
}

export async function authenticateUser(user, password) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password }),
  });

  if (response.status === 200) {
    const data = await response.json();
    setToken(data.token);
    return true;
  }
  return false;
}

export async function registerUser(user, password, password2) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 }),
  });

  if (response.status === 200) {
    return true; // Successful registration
  }
  return false;
}
