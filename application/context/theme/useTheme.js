import {useContext} from 'react';
import {ThemeContext} from './index';

const useThemeColors = () => {
  const {colors} = useContext(ThemeContext);
  return colors;
};

export default useThemeColors;
