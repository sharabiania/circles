import axios from "axios";

export async function logInUser(username, password) {
  const response = await axios.post(
    "https://d94o460neg.execute-api.us-east-1.amazonaws.com/api/login",
    {
      username: username,
      password: password,
    }
  );
  const token = response.data;
  return token;
}
