import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {Text, View} from "react-native";
import StackNavigator from "./StackNavigator";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const AooNavigator = () => {

    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();

    const onStateChange=async()=>{
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
                navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
            }
            routeNameRef.current = currentRouteName;
    }

    const onReady=() => {
        routeNameRef.current =
            navigationRef.current.getCurrentRoute().name;
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer
                ref={navigationRef}
                fallback={<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Loading...</Text></View>}
                onReady={onReady}
                onStateChange={onStateChange}>
                <StackNavigator/>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default AooNavigator;
