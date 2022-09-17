import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Home from "../screens/Home";
import Player from "../screens/Player";



const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <>

                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                    initialRouteName='Home'
                >
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Player" component={Player}/>
                </Stack.Navigator>


        </>
    );
};
export default StackNavigator;
