import { createContext, useState } from "react";

export const AuthContent = createContext({});

export default function AuthContentProvider(props) {
   const [username, setUsername]=useState('');
   const [token, setToken] = useState('');

   const setAuthUsername=(username)=>{
        setUsername(username)
    }
    const setAuthToken=(token)=>{
      setToken(token)
    }
  const value = {
    storedUsername: username,
    token: token,
    isAuthenticated: !!token,
    setAuthToken: setAuthToken,
    setAuthUsername: setAuthUsername,
  };

  return (
    <AuthContent.Provider value={value}>{props.children}</AuthContent.Provider>
  );
}
