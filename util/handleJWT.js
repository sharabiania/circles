
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function handleJWT(token, username) {
    let decodedJWT = jwt_decode(token);
    if (username == decodedJWT['cognito:username']) {
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('username', username);
      AsyncStorage.setItem('expiration', decodedJWT['exp'].toString());
      
    }
  }