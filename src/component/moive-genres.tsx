import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {fetchgenres} from '../healpers/api-helpers';

interface IMovieGenreProps {
  genreIds: number[];
}

interface IGenre {
  id: number;
  name: string;
}

export default function MovieGenre({genreIds}: IMovieGenreProps) {
  const [movieGenres, setMovieGenres] = useState<IGenre[]>([]);

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
          <TouchableOpacity style={styles.genre_container} key={genre.id}>
            <Text style={styles.genre_text}>{genre.name}</Text>
          </TouchableOpacity>
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
