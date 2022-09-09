import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {scale} from 'react-native-size-matters';
import SubText from './SubText';
import useThemeColors from '../../context/theme/useTheme';

const LoadingScreen = () => {
  const {CText, CBackground} = useThemeColors();
  return (
    <View
      style={{
        flex: 1,
        padding: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CBackground,
        height: '100%',
      }}>
      <Spinner
        isVisible={true}
        // size={this.state.size}
        type="Bounce"
        color={CText}
      />
      <SubText
        style={{color: CText, marginTop: scale(10)}}
        title="در حال دریافت اطلاعات ..."
      />
    </View>
  );
};

export default LoadingScreen;
