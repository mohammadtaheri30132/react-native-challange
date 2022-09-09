import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const Input = ({
  style,
  placeholderTextColor = '#002A32',
  backgroundColor = '#EAEAEA',
  ...otherProps
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      placeholderTextColor={placeholderTextColor}
      style={[style, styles.text, {backgroundColor: backgroundColor}]}
      {...otherProps}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  text: {
    height: 50,
    color: '#002A32',
    padding: 12,
    fontFamily: 'Shabnam-FD',
    borderRadius: 10,
    width: '100%',
  },
});
