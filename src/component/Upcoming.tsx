import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome';

import {fetchmovies} from '../healpers/api-helpers';

interface I_upcoming_Props {
  type: string;
}

export default function Upcoming(props: I_upcoming_Props) {
  const type = props.type;
  const navigation = useNavigation();
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchmovies(type);
        setUpcomingMovies(data.results);
      } catch (error) {
        console.error('Error Fetching Upcoming Movies', error);
      }
    };
    fetchData();
  }, [type]);

  const handelNagivation = item => {
    navigation.navigate('Detail', {movie: item});
  };

  return (
    <View>
      <View style={styles.title}>
        <Icons name="minus" style={styles.line} />
        <Text style={styles.text}>Upcoming releases</Text>
      </View>
      <FlatList
        data={upcomingMovies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.image_container}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => handelNagivation(item)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#c7c9caff',
    fontWeight: 'bold',
  },
  movieContainer: {
    marginRight: 20,
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 10,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  title: {
    gap: 10,
    flexDirection: 'row',
  },
  line: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '90deg'}],
  },
  image_container: {
    marginTop: 20,
  },
});
