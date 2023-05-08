const url = "https://d94o460neg.execute-api.us-east-1.amazonaws.com/api/login";
export async function login(username, password) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  //const data = await response.text();
  return response;
}