import React, { useState, useContext, useEffect} from 'react';
import {
  FlatList,
  View,
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
import { joinEvent, cancelEvent } from '../util/auth';


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

  
  async function attendEvent() {
    if (btnText === 'Join') {
      setBtnText('Cancel Request');
    try {
      const response = await joinEvent(storedInfo.token, item.id);

      const status = response.status;
      if (status === 200) {
        alert('you successfully joined the event')
      }
    } catch (error) {
      alert(error);
    }
  } else {
    setBtnText('Join');
    try {
      const response = await cancelEvent(storedInfo.token, item.id);

      const status = response.status;
      if (status === 200) {
        alert('you successfully cancel the event')
      }
    } catch (error) {
      alert(error);
    }
  }
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
    <View style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        {!!images[0] && <ImageSlider images={images} ></ImageSlider>}
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
        color='#FF5400'
        onPress={attendEvent}
      />
    </TouchableOpacity>
    </View>
  );
}


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
    const backgroundColor = selectedId.includes(item.id) ? '#FF5400' :'#FFA500';
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
    <View style={styles.container}>
      <Text style={styles.header}>List of all upcoming events</Text>
      
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
    </View>
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
    marginHorizontal: '5%',
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
});