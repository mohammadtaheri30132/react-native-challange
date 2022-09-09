import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import useThemeColors from '../../context/theme/useTheme';

const SubText = ({
  title,
  light ,
  style,
  size = scale(13),
  color,
}) => {
  const {CText} = useThemeColors();
  if (!color) {
    color = CText;
  }
  return (
    <Text
      style={[{fontSize: size, color: color, fontFamily:light? 'OpenSans-Light':'OpenSans-Regular'}, style]}>
      {title}
    </Text>
  );
};

export default SubText;
