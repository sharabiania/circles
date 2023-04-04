import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import EventList from './components/EventList';
import MasterList from './components/MasterList';


const FirstRoute = () => (
    <EventList />  
);

const SecondRoute = () => (  
    <MasterList />  
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function App() {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Events' },
    { key: 'second', title: 'Masters' },
  ]);

  return (
    // <View style={styles.container}>      
    //   <StatusBar style="auto" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: layout.width }}
      />     
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
