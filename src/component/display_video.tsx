import WebView from 'react-native-webview';
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {fetchvideos} from '../healpers/api-helpers';
import {deviceWidth} from '../constants/dimensions';

interface IDisplayVideo {
  movie_id: number;
}

export default function VideoPlayer(props: IDisplayVideo) {
  const movie_id = props.movie_id;
  const [videoLink, setVideoLink] = useState('');

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const data = await fetchvideos(movie_id);
        setVideoLink(data);
      } catch (error) {
        console.error('Error Fetching Video Link: ', error);
      }
    };
    fetchVideoLink();
  }, [movie_id]);

  return (
    <View style={styles.videoContainer}>
      {videoLink ? (
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${videoLink[1].key}?autoplay=1&rel=0&controls=0&showinfo=0&mute=1`,
          }}
          style={styles.video}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: 200,
    width: deviceWidth,
  },
});
