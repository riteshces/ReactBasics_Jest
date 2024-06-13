export async function Get(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}

export async function Post(url, data) {
  return await fetch(url, { method: "POST", body: data })
    .then((response) => response.json())
    .catch((error) => console.error("Post Error:", error));
}
