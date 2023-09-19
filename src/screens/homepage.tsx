import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Navbar from '../component/Navbar';
import Upcoming from '../component/Upcoming';
import Popular from '../component/Popular';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.movies}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Upcoming type="upcoming" />
          <Popular type="popular" />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23292fff',
    flex: 1,
  },
  movies: {
    margin: 20,
  },
  text: {
    color: 'white',
  },
});
