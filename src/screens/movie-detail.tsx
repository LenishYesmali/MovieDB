import React from 'react';
import Navbar from '../component/navbar';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet, Text, View} from 'react-native';

import MovieOverview from '../component/movie-overview';
import MovieGenre from '../component/moive-genres';

export default function MovieDetail({route}) {
  const {movie} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Navbar />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.image}
          />
          <View style={styles.image_text}>
            <View style={styles.titleContainer}>
              <Text style={styles.text}>{movie.title}</Text>
            </View>
            <View style={styles.rating}>
              <Icons name="star" size={20} color={'yellow'} />
              <Text style={styles.text}>{movie.vote_average}</Text>
            </View>
          </View>
        </View>
        <MovieGenre genreIds={movie.genre_ids} />
        <MovieOverview overview={movie.overview} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292fff',
  },
  text: {
    margin: 20,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image_text: {
    bottom: 0,
    height: 100,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#23292fff',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '70%',
  },
  rating: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
