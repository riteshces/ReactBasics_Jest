export async function Get(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
