import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

export default function Navbar() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearchBar = () => {
    setSearchVisible(!isSearchVisible);
  };

  const closeSearchBar = () => {
    setSearchVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeSearchBar}>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Icons name="grid" size={20} color={'white'} />
          <View style={styles.title}>
            <Text style={styles.text}>Movies</Text>
            <Text style={styles.subtext}>DB</Text>
          </View>
          <Icons
            name={isSearchVisible ? 'close' : 'search'}
            size={20}
            color={'white'}
            onPress={toggleSearchBar}
          />
        </View>
        {isSearchVisible && (
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              autoFocus
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: 30,
    backgroundColor: '#161617ff',
  },
  navbar: {
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtext: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 2,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
  },
  searchInput: {
    fontSize: 16,
    color: 'black',
  },
});
