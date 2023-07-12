import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const ImageSlider = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let allImages=images.images;

  const handleScroll = (event) => {
    const newIndex = Math.floor((event.nativeEvent.contentOffset.x+0.5) / Dimensions.get('window').width);
    setCurrentIndex(newIndex);
  };

  const handleMomentumScrollEnd = (event) => {
    const newIndex = Math.floor((event.nativeEvent.contentOffset.x+0.5) / Dimensions.get('window').width);
    setCurrentIndex(newIndex);
  };

  const renderSeparator = () => <View style={styles.separator} />;

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
        ItemSeparatorComponent={renderSeparator}
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
   width: Dimensions.get('window').width*0.9,
   aspectRatio: 1,    
   resizeMode: 'cover',
  },
  separator: {
    width: Dimensions.get('window').width*0.1, 
    backgroundColor:'#FFA500', 
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
