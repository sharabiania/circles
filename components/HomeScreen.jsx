import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventList from './EventList';
import MasterList from './MasterList';
import { useContext } from 'react';
import { AuthContent } from '../store/auth-context';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoutModal from './ui/logOutModal';

const Tab = createBottomTabNavigator();

const HomeNotLoginView = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.unAuthContainer}>
      <Text style={styles.appName}>Welcome to Spritual Life</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signUpButtonText}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const { storedInfo, setFcn } = useContext(AuthContent);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    setFcn.setAuthToken(null);
  };

  return (
    <>
      {!storedInfo.isAuthenticated && <HomeNotLoginView />}

      {storedInfo.isAuthenticated && (
        <View style={styles.authContainer}>
          <View>
            <Text style={styles.textWelcome}>
              Welcome {storedInfo.username}!
            </Text>
          </View>

          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>

          <LogoutModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onLogout={handleLogout}
          />
        </View>
      )}

      {storedInfo.isAuthenticated && (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Events') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Masters') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Events' component={EventList} />
          <Tab.Screen name='Masters' component={MasterList} />
        </Tab.Navigator>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  authContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    backgroundColor: '',
    borderRadius: 6,
  },
  textWelcome: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  unAuthContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
    marginTop: 100,
  },
  loginButton: {
    backgroundColor: 'grey',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 80,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    marginBottom: 10,
  },
  signUpButtonText: {
    color: 'blue',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  logoutContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatarButton: {
    marginRight: 10,
  },
  signOutText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
