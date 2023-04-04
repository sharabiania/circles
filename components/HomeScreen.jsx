import React from 'react'
import { useWindowDimensions, Button } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import EventList from './EventList';
import MasterList from './MasterList';


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

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Events' },
    { key: 'second', title: 'Masters' },
  ]);

  return (
    <>
      <Button title='login' onPress={() => navigation.navigate('Login')} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: layout.width }}
      />
    </>
  )
}