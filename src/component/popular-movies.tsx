import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {fetchmovies} from '../healpers/api-helpers';

interface IPopularMovies {
  type: string;
}

export default function PopularMovies(props: IPopularMovies) {
  const type = props.type;
  const navigation = useNavigation();
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchmovies(type);
        setPopularMovies(data.results);
      } catch (error) {
        console.error('Error Fetching Popular Movies', error);
      }
    };
    fetchData();
  }, [type]);

  const handelNagivation = item => {
    navigation.navigate('Detail', {movie: item});
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Icons name="minus" style={styles.line} />
        <Text style={styles.text}>Popular</Text>
      </View>
      <FlatList
        data={popularMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.image_container}
            onPress={() => handelNagivation(item)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
            <Text style={styles.image_text}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 80,
  },
  line: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '90deg'}],
  },
  title: {
    gap: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: '#c7c9caff',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 10,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  image_container: {
    marginTop: 20,
  },
  image_text: {
    left: 10,
    right: 10,
    bottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c7c9caff',
    position: 'absolute',
  },
});
