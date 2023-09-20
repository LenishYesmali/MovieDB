import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {fetchgenres} from '../healpers/api-helpers';

export default function MovieGenre({genreIds}) {
  const [movieGenres, setMovieGenres] = useState([]);

  useEffect(() => {
    const fetchMovieGenre = async () => {
      try {
        const data = await fetchgenres(genreIds);
        setMovieGenres(data);
      } catch (error) {
        console.error('Error Fetching Genre', error);
      }
    };
    fetchMovieGenre();
  }, [genreIds]);

  return (
    <View style={styles.container}>
      <View style={styles.genre}>
        {movieGenres.map(genre => (
          <View style={styles.genre_container} key={genre.id}>
            <Text style={styles.genre_text}>{genre.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  genre: {
    gap: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  container: {
    marginLeft: 20,
    marginBottom: 10,
  },
  genre_text: {
    fontSize: 16,
    color: 'white',
  },
  genre_container: {
    height: 40,
    padding: 6,
    width: 'auto',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: 'white',
  },
});
