import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';

export default function Navbar() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Icons name="grid" size={20} color={'white'} />
        <Text style={styles.text}>MoviesDB</Text>
        <Icons name="search" size={20} color={'white'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'center',
    borderBottomRightRadius: 30,
    backgroundColor: '#161617ff',
  },
  navbar: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
