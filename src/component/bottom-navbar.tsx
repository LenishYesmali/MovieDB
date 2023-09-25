import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';

import {deviceWidth} from '../constants/dimensions';

export default function BottomNavbar() {
  const route = useRoute();
  const navigation = useNavigation();

  const isScreenActive = (screenName: string) => {
    return route.name === screenName;
  };
  const handelScreenNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handelScreenNavigation('Home')}>
        <Icons
          name="home"
          style={[styles.icons, isScreenActive('Home') && styles.activeIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handelScreenNavigation('Bookmark')}>
        <Icons
          name="heart"
          style={[
            styles.icons,
            isScreenActive('Bookmark') && styles.activeIcon,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icons
          name="play-circle"
          style={[styles.icons, isScreenActive('Play') && styles.activeIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icons
          name="user"
          style={[styles.icons, isScreenActive('User') && styles.activeIcon]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: deviceWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  icons: {
    fontSize: 26,
    color: 'white',
    marginLeft: 30,
    marginRight: 30,
  },
  activeIcon: {
    color: 'red',
  },
});
