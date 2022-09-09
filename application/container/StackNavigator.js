import React, {useCallback, useMemo, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './TabsNavigator';
import SingINUpScreen from '../screens/sign-in-sing-up';


import {Platform} from 'react-native';
import {TransitionPresets, TransitionSpecs} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';


const Stack = createStackNavigator();

const StackNavigator = ({Authed}) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: Platform.constants.Release > 8 ? true : false,
        }}
        initialRouteName={true ? 'TabNavigator' : 'SingINUpScreen'}>
        {/* STACK */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="SingINUpScreen" component={SingINUpScreen} />
        {/* STACK */}

        {/* SCREEN */}
      </Stack.Navigator>


    </>
  );
};
export default StackNavigator;
