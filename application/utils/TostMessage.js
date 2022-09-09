import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {ErrorWhite, SuccessWhite} from '../components/shared/Icons';
import {scale} from 'react-native-size-matters';

export const error_type = toast => {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#D13743',
        margin: 10,
        width: '80%',
        borderRadius: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <ErrorWhite />

      <Text
        style={{
          fontFamily: 'Shabnam-FD',
          fontSize: scale(12),
          color: '#fff',
          marginHorizontal: 20,
        }}>
        {toast.message}
      </Text>
    </View>
  );
};

export const sucess_type = toast => {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#00BFA5',
        margin: 10,
        width: '80%',

        borderRadius: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <SuccessWhite color="#fff" />

      <Text
        style={{
          fontFamily: 'Shabnam-FD',
          fontSize: scale(12),
          color: '#fff',
          marginHorizontal: 20,
        }}>
        {toast.message}
      </Text>
    </View>
  );
};
