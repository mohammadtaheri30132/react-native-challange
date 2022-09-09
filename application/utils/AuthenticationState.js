
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthenticationState = async () => {
  try {

    // Authentication
    const value = await AsyncStorage.getItem('token');
    const intro = await AsyncStorage.getItem('intro');

    if (value !== null) {
      return {data: true, intro};
      // We have data!!
    }
    return {data: false, intro};
  } catch (error) {
    // Error retrieving data
  }
};
export default AuthenticationState;
