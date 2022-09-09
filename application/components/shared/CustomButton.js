import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale} from "react-native-size-matters";

const CustomButton = ({
  title,
  onPress,
  style,
  fontFamily = 'Shabnam-Medium',
  textColor = '#ffffff',
  fontSize = scale(13),
  backgroundColor = '#0ea960',
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        disabled
          ? {backgroundColor: '#d9d9d9'}
          : {backgroundColor: backgroundColor},
        styles.button,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          disabled
            ? {color: '#7b7b7b', fontFamily: fontFamily}
            : {color: textColor, fontFamily: fontFamily},
          styles.text,
          {fontSize: fontSize},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 5,
    display: 'flex',
  },
  text: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});
