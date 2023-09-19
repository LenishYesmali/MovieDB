import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navbar from '../component/Navbar';

export default function Detailpage({route}) {
  const {movie} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Navbar />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.text}>{movie.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23292fff',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  imageContainer: {
    height: 600,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    height: 600,
    width: '100%',
    objectFit: 'cover',
  },
});
