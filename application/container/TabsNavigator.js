import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import {Classes, Coach, Courts, Home, Map, Messages} from '../components/shared/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';

import useThemeColors from '../context/theme/useTheme';
import ProfileScreen from "../screens/profile/ProfileScreen";


const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  const {CBackground, CText, colotTabNavigatitor} = useThemeColors();

  // React.useEffect(() => {
  //   const _retrieveData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('token');
  //       if (value === null) {
  //         navigation.replace('SingINUpScreen');
  //       }
  //     } catch (error) {}
  //   };
  //
  //   _retrieveData();
  // }, []);

  return (
    <Tab.Navigator

      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#0ea960',

        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <Home  active={focused} />
            );
          } else if (route.name === 'Messages') {
            return (
              <Messages  active={focused} />
            )}
          else if (route.name === 'Coach') {
            return (
              <Coach  active={focused} />
            )}
          else if (route.name === 'Courts') {
            return (
              <Courts  active={focused} />
            )}
          else if (route.name === 'Classes') {
            return (
              <Classes  active={focused} />
            )}
          else if (route.name === 'Map') {
            return (
              <Map  active={focused} />
            );
          }
        },
        tabBarInactiveTintColor:'#979797',
        tabBarLabelStyle: {
          fontFamily: 'Shabnam-Bold-FD',
          fontSize: scale(10),
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 0,
          padding: 10,
          paddingBottom: 10,
          height: scale(65),
          backgroundColor: CBackground,
        },
      })}>
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Map" component={HomeScreen} />
        <Tab.Screen name="Home" component={ProfileScreen} />
        <Tab.Screen name="Coach" component={HomeScreen} />
        <Tab.Screen name="Classes" component={HomeScreen} />
      <Tab.Screen name="Courts" component={HomeScreen} />


    </Tab.Navigator>
  );
};
export default TabNavigator;
