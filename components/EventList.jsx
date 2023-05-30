import React, { useState, useContext } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { getEvents } from '../util/auth';
import { AuthContent } from '../store/auth-context';

function Item({ item, onPress, backgroundColor, textColor }) {
  const [btnText, setBtnText] = useState('Join');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
      <Text>{item.location}</Text>
      <Text>{item.date}</Text>
      <Text>{item.description}</Text>
      <Button
        title={btnText}
        color='#841584'
        onPress={() => {
          if (btnText === 'Join') {
            setBtnText('Cancel Request');
          } else {
            setBtnText('Join');
          }
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 28,
  },
});

export default function EventList() {
  const [selectedId, setSelectedId] = useState();
  const { storedInfo } = useContext(AuthContent);
  const [data, setData] = useState();

  async function getEventList(token) {
    try {
      const response = await getEvents(token);
      const eventData = await response.json();
      const status = response.status;
      if (status === 200) {
        setData(eventData);
      }
    } catch (error) {
      alert(error);
    }
  }

  if (!data && storedInfo.isAuthenticated) {
    getEventList(storedInfo.token);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <>
      <Text>List of all upcoming events</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </>
  );
}
