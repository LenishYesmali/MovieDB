import {
  View,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/FontAwesome';

import Navbar from '../component/navbar';
import MovieGenre from '../component/moive-genres';
import VideoPlayer from '../component/display_video';
import BottomNavbar from '../component/bottom-navbar';
import MovieOverview from '../component/movie-overview';

export default function MovieDetail({route}) {
  const {movie} = route.params;

  const [pulseAnimation] = useState(new Animated.Value(1));
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [imageContainerHeight] = useState(new Animated.Value(600));

  useEffect(() => {
    startPulseAnimation();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handlePlayVideo = () => {
    setIsVideoVisible(true);
    Animated.timing(imageContainerHeight, {
      toValue: 450,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar_container}>
        <Navbar />
      </View>
      <ScrollView>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              height: imageContainerHeight,
            },
          ]}>
          {!isVideoVisible ? (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.image}
            />
          ) : (
            <VideoPlayer movie_id={movie.id} />
          )}
          <View style={styles.image_text}>
            <View style={styles.titleContainer}>
              <Text style={styles.text}>{movie.title}</Text>
            </View>
            <View style={styles.rating}>
              <Icons name="star" size={20} color={'yellow'} />
              <Text style={styles.text}>{movie.vote_average}</Text>
            </View>
          </View>
          {!isVideoVisible && (
            <TouchableOpacity
              onPress={handlePlayVideo}
              style={[styles.play_btn, {transform: [{scale: pulseAnimation}]}]}>
              <Icons name="play" color={'white'} size={20} />
            </TouchableOpacity>
          )}
        </Animated.View>
        <MovieGenre genreIds={movie.genre_ids} />
        <MovieOverview overview={movie.overview} />
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292fff',
  },
  text: {
    margin: 20,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  image_text: {
    bottom: 0,
    height: 100,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#23292fff',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: '70%',
  },
  rating: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  play_btn: {
    flex: 1,
    zIndex: 1,
    width: 60,
    right: 10,
    height: 60,
    bottom: 120,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#ff0000',
  },
  navbar_container: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    position: 'absolute',
  },
});
