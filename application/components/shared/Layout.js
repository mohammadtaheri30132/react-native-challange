import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import useThemeColors from "../../context/theme/useTheme";
import {scale} from "react-native-size-matters";

const Layout = ({ children,ph=10,pv=10,bg}) => {
    const {CBackground,} = useThemeColors();

    return (
    <SafeAreaView style={{paddingHorizontal:scale(ph),paddingVertical:scale(pv),backgroundColor:bg?bg:CBackground}}>
      <StatusBar backgroundColor={CBackground} hidden={false} translucent={false}/>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
