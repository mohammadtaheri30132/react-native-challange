import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import useThemeColors from '../../context/theme/useTheme';

const TitleText = ({children, style, color, bold = true, size = scale(15)}) => {
  const {CText} = useThemeColors();
  if (!color) {
    color = CText;
  }
  return (
    <Text
      style={[
        bold
          ? {fontFamily: 'OpenSans-Bold'}
          : {fontFamily: 'OpenSans-Medium'},
        {fontSize: size, color: color},
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TitleText;
