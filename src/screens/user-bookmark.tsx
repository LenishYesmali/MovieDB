import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../component/navbar';
import BottomNavbar from '../component/bottom-navbar';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IBookmarkedMovie {
  id: number;
  title: string;
  poster_path: string;
}

export default function UserBookmark() {
  const navigation = useNavigation();

  const [bookmarkedMovies, setBookmarkedMovies] = useState<IBookmarkedMovie[]>(
    [],
  );

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      try {
        const bookmarks = await AsyncStorage.getItem('bookmarkedMovies');
        if (bookmarks) {
          const parsedBookmarks = JSON.parse(bookmarks) as IBookmarkedMovie[];
          setBookmarkedMovies(parsedBookmarks);
        }
      } catch (error) {
        console.error('Error fetching bookmarked movies', error);
      }
    };
    fetchBookmarkedMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar />

      <FlatList
        data={bookmarkedMovies}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.image_container}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {movie: item})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />

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
  bottom_navbar: {
    bottom: 0,
    position: 'absolute',
  },
  image_container: {
    flex: 1,
    margin: 10,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
