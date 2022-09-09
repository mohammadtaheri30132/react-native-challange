import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Animated,
    FlatList,
    StatusBar,
    TouchableWithoutFeedback,
    useWindowDimensions, Platform,
} from 'react-native';
import {
  ScalingDot,
  SlidingBorder,
  ExpandingDot,
  SlidingDot,
} from 'react-native-animated-pagination-dots';
import {scale} from 'react-native-size-matters';

import {Slid1, Slid2, Slid3, Slid4} from '../../components/shared/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    key: '0',
    text: 'هر کی هستیم و در هر جایگاهی هستیم فرقی نداره',
    title: 'کجا ایستادی ؟!',
    image: <Slid1 />,
    backgroundColor: '#002a32',
  },
  {
    key: '1',
    title: 'پیش نیاز موفقیت',
    text: 'ما برای موفقیت در هر زمینه ای به آگاهی نیاز داریم',

    image: <Slid2 />,
    backgroundColor: '#002a32',
  },
  {
    key: '2',
    title: 'میزان موفقیت !',
    text: 'پس هر چقدر آگاه تر، موفق تر !',
    image: <Slid3 />,
    backgroundColor: '#002a32',
  },
  {
    key: '3',
    title: 'آماده ای ؟',
    text: 'پس برای آگاه تر شدن و موفق شدن .....',
    image: <Slid4 />,
    backgroundColor: '#002a32',
  },
];
const INTRO_DATA = [
  {
    key: '1',
    title: 'App showcase ✨',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    key: '2',
    title: 'Introduction screen 🎉',
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
  },
  {
    key: '3',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
  {
    key: '4',
    title: 'And can be anything 🎈',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
  },
];
const IntroScreen = ({serintero}) => {
  const {width} = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [activeIndex, setActiveIndex] = React.useState(0);

  let flatListRef = React.useRef(null);
  React.useEffect(() => {
    const handleColor = async () => {
      try {
        await changeNavigationBarColor('#002A32');
      } catch (e) {}
    };
    handleColor();
  }, []);
  const gotoNextPage = async () => {
    if (activeIndex == 3) {
      await AsyncStorage.setItem('intro', 'true');
      serintero(true);
      return;
    }
    if (activeIndex + 1 < slides.length) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  const renderItem = React.useCallback(
    ({item}) => {
      return (
        <View style={[styles.itemContainer, {width: width - 80}]}>
          <View
            style={{
              width: scale(300),
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: scale(380),
            }}>
            {item.image}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    },
    [width],
  );
  const onViewRef = React.useRef(({viewableItems}: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const keyExtractor = React.useCallback(item => item.key, []);
  return (
    <View style={[{background: '#002a32', flex: 1}]}>
      <StatusBar backgroundColor="#002A32" hidden={false} translucent={false} />

      <FlatList
        data={slides}
        ref={flatListRef}
        inverted
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        style={styles.flatList}
        contentContainerStyle={{backgroundColor: '#002A32'}}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
      <View style={styles.dotContainer}>
        <ExpandingDot
          data={slides}
          expandingDotWidth={20}
          scrollX={scrollX}
          inActiveDotColor={'#fff'}
          activeDotColor={'#2FDD92'}
          inActiveDotOpacity={1}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={{
            transform: [{scaleX: -1}],
            // top: 30,
          }}
        />
      </View>

      <TouchableWithoutFeedback
        underlayColor="#ccc"
        onPress={gotoNextPage}
        style={{}}>
        <View
          style={{
            width: '100%',
            height: scale(100),
            backgroundColor: '#002A32',

            justifyContent: 'center',
            alignItems: 'center',
            padding: scale(20),
            marginRight: 'auto',
            marginLeft: 'auto',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#2fdd92',
              width: '100%',
              height: scale(50),
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: scale(14),
                color: '#002A32',
                fontFamily: 'Shabnam-Bold-FD',
              }}>
              {activeIndex == 3 ? ' بزن بریم!' : 'بعدی'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  dotContainer: {
    justifyContent: 'center',

    alignSelf: 'center',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 40,
    paddingBottom: scale(80),
    borderRadius: 20,
  },

  title: {
    fontFamily: 'Shabnam-Bold-FD',
    marginVertical: scale(10),
    marginTop: scale(100),
    marginBottom: scale(5),
    fontSize: scale(23),
    color: '#fff',
    letterSpacing: Platform.OS == 'android' ? -2 : 0,
  },
  text: {
    letterSpacing: Platform.OS == 'android' ? -1 : 0,
    fontFamily: 'Shabnam-FD',
    textAlign: 'center',
    fontSize: scale(16),
    paddingHorizontal: scale(5),
    color: '#dbe1e2',
  },
});
export default IntroScreen;
