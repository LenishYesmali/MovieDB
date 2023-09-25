import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

import Navbar from '../component/navbar';
import BottomNavbar from '../component/bottom-navbar';
import {fetchsearchresult} from '../healpers/api-helpers';

interface ISearchResultPageProps {
  route: {
    params: {
      searchText: string;
    };
  };
}

interface SearchResultItem {
  id: number;
  poster_path: string;
}

export default function SearchResult({route}: ISearchResultPageProps) {
  const {searchText} = route.params;
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const data = await fetchsearchresult(searchText);
        setSearchQuery(data.results);
        console.log(searchQuery);
      } catch (error) {
        console.error('Search failed', error);
      }
    };
    fetchQuery();
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.title}>
        <Icons name="minus" style={styles.line} />
        <Text style={styles.text}>Search Results</Text>
      </View>
      <FlatList
        data={searchQuery}
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
  line: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '90deg'}],
  },
  title: {
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    color: '#c7c9caff',
  },
});
