import React, { useState, useContext } from 'react';
import {
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { getMasters } from '../util/auth';
import { AuthContent } from '../store/auth-context';

function Item({ item, onPress, backgroundColor, textColor }) {
  const [btnText, setBtnText] = useState('follow');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.fullname}</Text>
      <Text>{item.location}</Text>
      <Button
        title={btnText}
        color='#FF5400'
        onPress={() => {
          if (btnText === 'follow') {
            setBtnText('unfollow');
          } else {
            setBtnText('follow');
          }
        }}
      />
    </TouchableOpacity>
  );
}

export default function MasterList() {
  const [selectedId, setSelectedId] = useState();
  const { storedInfo } = useContext(AuthContent);
  const [data, setData] = useState();

  async function getMasterList(token) {
    try {
      const response = await getMasters(token);
      const masterData = await response.json();
      const status = response.status;
      if (status === 200) {
        setData(masterData);
      }
    } catch (error) {
      alert(error);
    }
  }

  if (!data && storedInfo.isAuthenticated) {
    getMasterList(storedInfo.token);
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#FF5400' : '#FFA500';
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>List of all registered masters</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECA6C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:5,
  },
  item: {
    padding: 5,
    marginVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    padding:8,
    width: Dimensions.get('window').width*0.95,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});