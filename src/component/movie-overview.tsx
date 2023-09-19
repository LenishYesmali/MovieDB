import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IOverView {
  overview: string;
}
export default function MovieOverview(props: IOverView) {
  const overview = props.overview;
  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Overview</Text>
      <Text style={styles.overview}>{overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  title_text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 14,
    marginTop: 6,
    color: 'white',
    textAlign: 'justify',
  },
});
