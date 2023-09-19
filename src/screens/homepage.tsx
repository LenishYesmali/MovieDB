import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Navbar from '../component/navbar';
import UpComingMovies from '../component/upcoming-movies';
import PopularMovies from '../component/popular-movies';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.movies}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <UpComingMovies type="upcoming" />
          <PopularMovies type="popular" />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292fff',
  },
  movies: {
    margin: 20,
  },
  text: {
    color: 'white',
  },
});
