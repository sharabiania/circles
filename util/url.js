//==prod url==
export const baseUrl = 'https://d94o460neg.execute-api.us-east-1.amazonaws.com/api/';

export async function request(route, method, body, token, contentType) {
    
  if (method == 'POST') {
    const response = await fetch(baseUrl + route, {
      method: method,
      headers: { 'Content-Type': contentType },
      body: JSON.stringify(body),
    });
    return response;
    
  } else if (method == 'GET') {
    const response = await fetch(baseUrl + route, {
      method: method,
      headers: { Authorization: `Bearer ${token}`,
                'Content-Type': contentType },
    });
    return response;

  } 
}