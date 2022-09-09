import React from 'react';

import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import OtpScreen from './OtpScreen';
import SingInScreen from './SingInScreen';


import ResetpasswordScreen from './ResetpasswordScreen';

const SingINUpScreen = ({navigation}) => {
  const Stack = createStackNavigator();
  React.useEffect(() => {
    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          navigation.replace('Home');
          // We have data!!
        }
        return false;
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData();
  }, []);
  return (
    <>
      <StatusBar translucent={false} backgroundColor="#ffffff" />
      <Stack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
        initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SingIpScreen" component={SingInScreen} />

        <Stack.Screen
          name="resetpasswordScreen"
          component={ResetpasswordScreen}
        />

      </Stack.Navigator>
    </>
  );
};

export default SingINUpScreen;
