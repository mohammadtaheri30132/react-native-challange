import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const ErrorMessage = ({error, visible, mt = scale(3)}) => {
  if (!visible || !error) {
    return null;
  }

  return (
    <Text
      style={{
        marginTop: mt,
        fontSize: scale(9),
        color: '#bc3e3e',
        fontFamily: 'Shabnam-FD',
      }}>
      {error}
    </Text>
  );
};

export default ErrorMessage;
