import React , {useState, useContext} from 'react';
import { Text, View,SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventList from './EventList';
import MasterList from './MasterList';
import { AuthContent } from '../store/auth-context';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogoutModal from './ui/LogOutModal';

const Tab = createBottomTabNavigator();

const LoggedOutHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView  style={styles.loggedOutContainer}>
      <Text style={styles.welcomeText}>Welcome to Spritual Life</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>
          Don't have an account? <Text style={styles.signUpButtonText}>Sign up</Text> 
        </Text>
        
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default function HomeScreen() {

  const { storedInfo, setFcn } = useContext(AuthContent);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setFcn.logOut();
    setModalVisible(false);
  };
  
  return (
    <>
      {!storedInfo.isAuthenticated && <LoggedOutHomeScreen />}
      {!!storedInfo.isAuthenticated && (
        <SafeAreaView style={styles.loggedinContainer}>
          <View style={styles.avatarContainer}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => setModalVisible(true)}
          >
          {/*<<!!storedInfo.username>> neccassay for the line below in expo debug; In browser it works without it though*/}
          {!!storedInfo.username && <Text>{storedInfo.username.substring(0, 2).toUpperCase()}</Text>}
          </TouchableOpacity>
         </View>

          <LogoutModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onLogout={handleLogout}
          />
        
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {backgroundColor: '#FECA6C'},
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
            tabBarActiveTintColor: '#FF5400',
            tabBarInactiveTintColor: '#000000',
          })}
          tabBarStyle={{backgroundColor: '#FECA6C'}} 
        >
          <Tab.Screen name='Events' component={EventList} options={{ headerShown: false}}/>
          <Tab.Screen name='Masters' component={MasterList} options={{ headerShown: false}}/>
        </Tab.Navigator>
        </SafeAreaView>
      )}
      
    </>
  );
}
const styles = StyleSheet.create({
  loggedinContainer:{
    flex:1,
    backgroundColor: '#FECA6C',
    justifyContent: 'center'
  },
  loggedOutContainer: {
    flex:1,
    alignItems: 'center',
    backgroundColor: '#FECA6C',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 150,
    marginTop: 100,
  },
  loginButton: {
    backgroundColor: '#FF5400',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButtonText:{
    fontSize:16,
    fontWeight: 'bold',
    color: '#FF5400',
  },

  avatarContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight:6,
    marginTop:35,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFA500',
    borderColor: '#FF5400',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },


});
