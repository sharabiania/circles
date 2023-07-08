import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';

export const AuthContent = createContext({});

export default function AuthContentProvider(props) {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchToken() {
      const storedExpiration = await AsyncStorage.getItem('expiration');
      const expirationDate = new Date(storedExpiration*1000).toUTCString();
      let currentDate = new Date().toUTCString();
      if (currentDate > expirationDate) {
        logOut();
        alert('credentials not valid anymore, login again')
      }else {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUsername = await AsyncStorage.getItem('username');
      setInfoToStore(storedToken, storedUsername);}
    }
    fetchToken();
    
  }, []);

  const setInfoToStore = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  const logOut = () => {
    setToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('expiration');
    AsyncStorage.removeItem('username');
  };

  const storedInfo = {
    username: username,
    token: token,
    isAuthenticated: !!token,
  };

  const setFcn = {
    setInfoToStore: setInfoToStore,
    logOut: logOut
  };
  const value = {
    storedInfo: storedInfo,
    setFcn: setFcn,
  };

  return (
    <AuthContent.Provider value={value}>{props.children}</AuthContent.Provider>
  );
}
