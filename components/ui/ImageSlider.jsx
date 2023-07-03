import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const ImageSlider = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log('............')
  let allImages=images.images;
  //console.log('all images are...'+JSON.stringify(allImages))

  const image = [
    { id: 1, source: require('../../assets/icon.png') },
    { id: 2, source: require('../../assets/favicon.png') },
    { id: 3, source: require('../../assets/icon.png') },
    // Add more images as needed
  ];

  const handleScroll = (event) => {
    const newIndex = Math.floor((event.nativeEvent.contentOffset.x+0.5) / Dimensions.get('window').width);
    setCurrentIndex(newIndex);
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.floor((event.nativeEvent.contentOffset.x+0.5) / Dimensions.get('window').width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{uri: item.source}} style={styles.image} resizeMode="contain" />
        )}
        pagingEnabled={true}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={Dimensions.get('window').width+10}
        snapToAlignment="start"
        decelerationRate="fast"
      />
      <View style={styles.circleContainer}>
        {allImages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              index === currentIndex ? styles.activeCircle : styles.inactiveCircle,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    
  },
  image: {
  width: Dimensions.get('window').width,
    aspectRatio: 1, 
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeCircle: {
    backgroundColor: 'black',
  },
  inactiveCircle: {
    backgroundColor: 'gray',
  },
});

export default ImageSlider;



/*
const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const images = [
      { id: 1, source: require('../../assets/human.png') },
      { id: 2, source: require('../../assets/icon.png') },
      { id: 3, source: require('../../assets/human.png') },
      // Add more images as needed
    ];
  
    return (
      <View style={styles.container}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Image source={item.source} style={styles.image} resizeMode="cover" />
          )}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.floor(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentIndex(newIndex);
          }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').height/5,
    },
  });

  export default ImageSlider;
  */