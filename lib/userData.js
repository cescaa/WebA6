import { getToken } from "./authenticate";

async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) return []; // If no token, return an empty array

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `JWT ${token}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }
  return [];
}

export async function addToFavourites(id) {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    { method: "PUT" }
  );
}

export async function removeFromFavourites(id) {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,
    { method: "DELETE" }
  );
}

export async function getFavourites() {
  return await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites`);
}

export async function addToHistory(id) {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,
    { method: "PUT" }
  );
}

export async function removeFromHistory(id) {
  return await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,
    { method: "DELETE" }
  );
}

export async function getHistory() {
  return await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history`);
}
