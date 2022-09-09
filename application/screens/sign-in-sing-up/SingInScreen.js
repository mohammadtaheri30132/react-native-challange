import React from 'react';
import CustomButton from '../../components/shared/CustomButton';
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import TitleText from '../../components/shared/TitleText';
import SubText from '../../components/shared/SubText';
import Input from '../../components/shared/Input';

import {useMutation} from 'react-query';
import {LoginPassword, forgetPassword} from '../../services/LoginRegisterApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowBack, Logo} from '../../components/shared/Icons';

const SingInScreen = ({navigation, route}) => {
  const {username} = route.params;
  const customNotification = React.useRef();
  const [text, setText] = React.useState('');
  const [validate, setvalidate] = React.useState(false);
  const {mutateAsync, isLoading} = useMutation(token => LoginPassword(token));
  const {mutateAsync: forgetpass, isLoading: forgetpassLoding} = useMutation(
    token => forgetPassword(token),
  );
  const tost = useToast();
  const onChangeText = e => {
    setText(e);

    if (e.length <= 3) {
      setvalidate(true);
    } else {
      setvalidate(false);
    }
  };
  const submitButton = async () => {
    try {

      const res = await mutateAsync('');
      if (res.status == 200) {
        if (res.data.status == 200) {
          axios.defaults.headers.common.Authorization = `Token ${res.data.key}`;

          await AsyncStorage.setItem('token', res.data.key);
          navigation.replace('TabNavigator');
        }
        if (res.data.status === 404) {
          tost.show('رمز عبور غلطه', {
            type: 'error_type',
          });
        }
      }
    } catch (e) {}
  };
  const restpass = async () => {
    try {

      const res = await forgetpass('');

      if (res.status === 200) {
        if (res.data.tag == 'otp') {
          navigation.navigate('resetpasswordScreen', {
            username,
            time: res.data.time,
          });
        } else if (res.data.error) {
          tost.show('مشکلی پیش امده است', {
            type: 'error_type',
          });
        }
      }
    } catch (e) {}
  };
  return (
    <>
      <SafeAreaView style={styles.containers}>
        <Logo />

        <TitleText color="#002A32" style={styles.title} title="سلام رفیق‌جان" />
        <SubText
          color="#858585"
          title="با دنیایی از ایده، فقط یک کلیک فاصله داری!"
        />
        <SubText color="#858585" style={styles.lable} title="رمز عبور" />
        <Input
          secureTextEntry={true}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableWithoutFeedback onPress={restpass}>
          {forgetpassLoding ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginRight: 'auto',
              }}>
              <SubText
                color="#858585"
                style={styles.forget}
                title="در حال ارسال کد ..."
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginRight: 'auto',
              }}>
              <SubText
                color="#858585"
                style={styles.forget}
                size={scale(10)}
                title="رمز عبورت رو یادت رفته؟ اینجا کلیک کن"
              />

              <ArrowBack />
            </View>
          )}
        </TouchableWithoutFeedback>

        <CustomButton
          disabled={validate}
          style={styles.button}
          onPress={submitButton}
          title="ورود به حساب کاربری"
        />
        <Text style={styles.protocol}>
          با ورود یا ثبت‌نام در چکیدا به‌طور خودکار با
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL('https://chekida.com/terms/');
            }}>
            <Text
              style={{
                fontFamily: 'Shabnam-Bold-FD',
                textDecorationLine: 'underline',
              }}>
              <Text> </Text>
              قوانین و مقررات
              <Text> </Text>
            </Text>
          </TouchableWithoutFeedback>
          چکیدا موافقت می‌کنید
        </Text>
      </SafeAreaView>
    </>
  );
};

export default SingInScreen;

const styles = StyleSheet.create({
  containers: {
    position: 'relative',
    backgroundColor: '#ffffff',
    flex: 1,

    justifyContent: 'center',
    padding: scale(25),
    // backgroundColor: 'red',
  },
  back: {
    margin: scale(25),
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
    width: scale(0),
  },
  protocol: {
    marginTop: scale(8),
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '62%',
    fontSize: scale(8),
    lineHeight: scale(19),
    textAlign: 'center',
    color: '#858585',
    fontFamily: 'Shabnam-FD',
  },

  lable: {
    marginTop: 50,
    marginBottom: 9,
  },
  forget: {
    display: 'flex',
    marginTop: scale(9),
    marginRight: scale(4),
    textDecorationLine: 'underline',
  },

  title: {
    marginBottom: scale(3),
    marginTop: scale(10),
  },

  button: {
    marginTop: scale(15),
  },

  logo: {
    width: scale(45),
    height: scale(45),
    marginRight: 'auto',
  },
});
