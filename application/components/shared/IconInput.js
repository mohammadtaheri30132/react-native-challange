import React from 'react';

import {Text, View, StyleSheet, TextInput} from 'react-native';
import ROW from './ROW';
import {scale} from 'react-native-size-matters';
import useThemeColors from '../../context/theme/useTheme';

const IconInput = ({
  placeholderTextColor = '#858585',
  height = 50,
  color,
  paddingHorizontal = 20,
  fontFamily = 'Shabnam-FD',
  backgroundColor,
  borderRadius = 8,
  width = '100%',
  borderColor = '#858585',
  borderWidth = 1,
  children,
  style,
  ...otherProps
}) => {
  const {CSubBackground, CText} = useThemeColors();
  if (!backgroundColor) {
    backgroundColor = CSubBackground;
  }
  if (!color) {
    color = CText;
  }
  return (
    <View style={{position: 'relative'}}>
      <TextInput
        autoCapitalize="none"
        placeholderTextColor={placeholderTextColor}
        style={[
          style,
          {
            height: height,
            color: color,
            paddingHorizontal: paddingHorizontal,
            borderColor: borderColor,
            borderWidth: borderWidth,
            fontFamily: fontFamily,
            textAlign: 'right',
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            width: width,
          },
        ]}
        {...otherProps}
      />
      <View
        style={{
          position: 'absolute',
          right: scale(20),
          top: scale(13),
        }}>
        {children}
      </View>
    </View>
  );
};

export default IconInput;
