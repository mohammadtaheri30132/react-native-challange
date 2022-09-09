import React from 'react';
import {StatusBar} from 'react-native';
import {colors} from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = React.createContext();
export const ThemeChangeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const [isLightTheme, setIsLightTheme] = React.useState(true);
  React.useEffect(() => {
    const checkTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme === 'dark') setIsLightTheme(false)

    };
    checkTheme();
  }, []);

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeChangeContext.Provider value={setIsLightTheme}>
        <StatusBar
          backgroundColor={isLightTheme ? '#fff' : '#002A32'}
          barStyle={isLightTheme ? 'dark-content' : 'light-content'}
          hidden={false}
          translucent={false}
        />

        {children}
      </ThemeChangeContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
