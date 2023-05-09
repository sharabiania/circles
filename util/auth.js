const url = "https://d94o460neg.execute-api.us-east-1.amazonaws.com";

export async function login(username, password) {
  const response = await fetch(url+"/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  //const data = await response.text();
  return response;
}

export async function signup(username, password,email) {
  const response = await fetch(url+"/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email}),
  });
  //const data = await response.text();
  return response;
}