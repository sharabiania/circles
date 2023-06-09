import React, { useState, useContext, useEffect} from 'react';
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
import { getImage } from '../util/auth';
import ImageSlider from './ui/ImageSlider';
import Spinner from './ui/Spinner';


const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

function Item({ item, onPress, backgroundColor, textColor }) {
  const [btnText, setBtnText] = useState('Join');
  const [images, setImages] = useState([]);
  const { storedInfo, setFcn } = useContext(AuthContent);

  if (!!item.img_src[0]) {
    useEffect(() => {
      eventImage();
    }, []);
  }

  
  const eventImage = async () => {
    try {
      const arrayImage = item.img_src;
      let imagesArray=[];
      let id=0;
      for (let imageData of arrayImage){
        let parts = imageData.split('/');
        let fileName = parts[1];
        let response = await getImage(storedInfo.token, fileName);
        let blob = await response.blob();
        id+=1;
        blobToDataURL(blob)
          .then((url) => {
            imagesArray=[...imagesArray, { id: id, source: url}];
            setImages(imagesArray)
          })
          .catch((error) => {
            console.error('Error converting Blob to data URL:', error);
          });
        } 
    
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <SafeAreaView style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
     
        {!!images && <ImageSlider images={images} ></ImageSlider>}
        {images.length==0 && <Spinner/>}
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
    
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
    </SafeAreaView>
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
  const [selectedId, setSelectedId] = useState([]);
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

  const setSelectedEvent=(id)=>{
    if (selectedId.includes(id)){
       let tempArray=selectedId.filter((element)=>element!==id);
       setSelectedId(tempArray);
    }else{
      setSelectedId([...selectedId, id])
    }
  }
  
  const renderItem = ({ item }) => {
    const backgroundColor = selectedId.includes(item.id) ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedEvent(item.id)}
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
