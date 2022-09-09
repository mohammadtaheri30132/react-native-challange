import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  ScrollView,
  StyleSheet, Text,

} from 'react-native';

import {scale} from 'react-native-size-matters';

import {useToast} from 'react-native-toast-notifications';
import useThemeColors from '../../context/theme/useTheme';

import * as Animatable from 'react-native-animatable';



import {SafeAreaView} from "react-native-safe-area-context";


const HomeScreen = ({navigation, route}) => {
  const {CBackground, CSubBackground, CText} = useThemeColors();


  const tost = useToast();








/*
  const {data: kk} = useQuery('loginCheck', getLoginCheck, {
    onSuccess(data) {
      if (data.data) {
        console.log('e8', data.data);
      } else {
        console.log('e9', data.data);
        // AsyncStorage.removeItem(
        //            'token'
        //        );
        //        navigation.replace('SingINUpScreen');
      }
    },
  });
*/





  return (
    <>
      <ScrollView
        contentContainerStyle={{backgroundColor: '#fff'}}
        style={{
          backgroundColor: '#fff',
        }}>
        <SafeAreaView>
        <Animatable.View
          key={111}
          style={{marginTop: scale(0), backgroundColor: '#fff'}}
          easing="ease-in-sine"
          animation="fadeIn">
          <View style={[styles.whiteBack,{background:'#fff'}]}>
            <Text style={{color:'red'}}>salam sajad</Text>
            <Text style={{color:'red'}}>babaaaasxc</Text>
          </View>

        </Animatable.View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default (HomeScreen);

const styles = StyleSheet.create({
  whiteBack: {},



});
