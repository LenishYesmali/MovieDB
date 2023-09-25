import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Navbar from '../component/navbar';
import BottomNavbar from '../component/bottom-navbar';
import PopularMovies from '../component/popular-movies';
import UpComingMovies from '../component/upcoming-movies';

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
      <View style={styles.bottom_navbar}>
        <BottomNavbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#23292fff',
  },
  movies: {
    margin: 20,
  },
  text: {
    color: 'white',
  },
  bottom_navbar: {
    bottom: 0,
    position: 'absolute',
  },
});
