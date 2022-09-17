import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import Slider from '@react-native-community/slider';
import {HeartIcon, PlayIcon, StopIcon} from '../components/shared/SvgIcons';
import Stars from '../components/shared/Stars';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {MusicContext} from "../context";

const Player = ({ route}) => {
  const [info] = useContext(MusicContext);

  const id = route.params.id;
  const rate = route.params.rate;
  const fav = route.params.fav;
  const faved = info[id].fav;

  const [isSeeking, setIsSeeking] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isChangedSilder, setIsChangedSilder] = useState(true);


  const {position, duration} = useProgress();
  const playerState = usePlaybackState();

  useEffect(() => {
    async function load() {
      await TrackPlayer.reset();

      var track = {
        url: info[id].audio, // Load media from the network
        title: info[id].title,
        artwork: info[id].cover, // Load artwork from the network
        duration: info[id].totalDurationMs, // Duration in seconds
      };

      await TrackPlayer.add(track);

      await TrackPlayer.updateOptions({
        waitForBuffer: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
        ],
        stopWithApp: true,
        alwaysPauseOnInterruption: true,
      });

      await TrackPlayer.play();
    }
    load();

  }, []);

  const play = async () => {
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const reset = async () => {
    await TrackPlayer.reset();
  };

  const seekto = async () => {
    await TrackPlayer.seekTo(0);
  };



  const slidingStarted = () => {
    setIsChangedSilder(false);
    setIsSeeking(true);
    pause()
  };
  //this function is called when the user stops sliding the seekbar
  const slidingCompleted = async value => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);

    setIsSeeking(false);

    setIsChangedSilder(true);
    play()


  };

  useEffect(() => {
    if (!isSeeking && position && duration) {
      const res = position / duration;

      setSliderValue(res);
      if (position >= duration) {
        //setIsPlaying(true);
        seekto(0);
        pause();
      }
    }
  }, [position, duration]);


  return (
    <SafeAreaView style={styles.safeArea}>
     <View style={styles.imageBox}>
       <TouchableOpacity
           onPress={() => fav(id)}
           activeOpacity={0.9}
           style={styles.heart}>
         <HeartIcon active={faved} />
       </TouchableOpacity>
       <Image
           style={styles.image}
           resizeMode="cover"
           source={{uri: info[id].cover}}
       />
     </View>
      <View style={styles.subCard}>
        <Text style={{color: '#fff'}}>{info[id].title}</Text>
        <Stars rate={rate} active={info[id].rate} id={id} />
      </View>



      <Slider
        style={styles.slider}
        minimumValue={0}
        onValueChange={value => setSliderValue(value)}
        maximumValue={1}
        value={position ? sliderValue : 0}
        thumbTintColor="#fff"
        minimumTrackTintColor={position ? '#2FDD92' : 'rgba(185,185,185,0.4)'}
        maximumTrackTintColor="#00404b"
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
      />
      <View style={styles.timerBox}>
        {isChangedSilder ? (
            <Text style={{color: '#fff'}}>
              {Math.ceil((position % (60 * 60)) / 60 - 1) == -1
                  ? '0'
                  : Math.ceil((position % (60 * 60)) / 60 - 1)}
              :{Math.ceil(position % 60)}
            </Text>
        ) : (
            <Text style={{color: '#fff'}}>{Math.ceil(((sliderValue*duration/1) % (60 * 60)) / 60 - 1) == -1
                ? '0'
                : Math.ceil(((sliderValue*duration/1) % (60 * 60)) / 60 - 1)}
              :{Math.ceil((sliderValue*duration/1) % 60)}</Text>
        )}
        <Text style={{color: '#fff'}}>
          {Math.ceil((duration % (60 * 60)) / 60 - 1) == -1
              ? '0'
              : Math.ceil((duration % (60 * 60)) / 60 - 1)}
          :{Math.ceil(duration % 60)}
        </Text>
      </View>
      {playerState === State.Paused ? (
          <TouchableOpacity  onPress={play}>
            <PlayIcon/>
          </TouchableOpacity>

      ) : (playerState === State.Playing ? (
          <TouchableOpacity  onPress={pause}>
            <StopIcon/>
          </TouchableOpacity>

      ) :   <TouchableOpacity  onPress={play}>
        <PlayIcon/>
      </TouchableOpacity>)}

    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  slider:{
    width: '100%',
    borderRadius: 10,
    transform: [{scaleX: 1}],

    marginTop: scale(20),
  },
  timerBox:{
    width:'100%',

    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  safeArea: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#0e2338',
    paddingHorizontal: scale(25),
    paddingVertical: scale(5),
  },

  title: {
    fontSize: scale(20),
    color: 'white',
    marginBottom: scale(10),
  },
  imageBox:{
    position:'relative',
    width:'100%',borderRadius:20,
  },

  card: {
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: scale(20)
  },
  subCard: {
    backgroundColor: '#1b344d',
    padding: scale(10),
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  heart: {
    position: 'absolute',
    left: scale(10),
    zIndex: 9999,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    top: scale(10)
  },
  image: {
    borderRadius:10,
    width: '100%',
    height: scale(200)
  }
});
