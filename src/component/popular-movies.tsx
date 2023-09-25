import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import {fetchmovies} from '../healpers/api-helpers';

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface IPopularMovies {
  type: string;
}

export default function PopularMovies(props: IPopularMovies) {
  const type = props.type;
  const navigation = useNavigation();

  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<IMovie[]>([]);

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

  const handleNavigation = (item: IMovie) => {
    navigation.navigate('Detail', {movie: item});
  };

  const toggleBookmark = (item: IMovie) => {
    const isBookmarked = isMovieBookmarked(item);
    if (isBookmarked) {
      removeBookmark(item);
    } else {
      addBookmark(item);
    }
  };

  const isMovieBookmarked = (movie: IMovie) => {
    return bookmarkedMovies.some(m => m.id === movie.id);
  };

  const addBookmark = (movie: IMovie) => {
    const updatedBookmarks = [...bookmarkedMovies, movie];
    setBookmarkedMovies(updatedBookmarks);
  };

  const removeBookmark = (movie: IMovie) => {
    const updatedBookmarks = bookmarkedMovies.filter(m => m.id !== movie.id);
    setBookmarkedMovies(updatedBookmarks);
  };

  useEffect(() => {
    AsyncStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
  }, [bookmarkedMovies]);

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
          <View style={styles.image_container}>
            <TouchableOpacity onPress={() => handleNavigation(item)}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
              />
              <Text style={styles.image_text}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleBookmark(item)}
              style={styles.bookmark_container}>
              {isMovieBookmarked(item) ? (
                <Icons name="check" style={styles.bookmark} />
              ) : (
                <Icons name="bookmark" style={styles.bookmark} />
              )}
            </TouchableOpacity>
          </View>
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
  bookmark_container: {
    right: 0,
    width: 40,
    height: 40,
    bottom: 20,
    position: 'absolute',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bookmark: {
    fontSize: 20,
    color: 'white',
  },
});
