import React from 'react';
import CustomButton from '../../components/shared/CustomButton';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
import TitleText from '../../components/shared/TitleText';
import SubText from '../../components/shared/SubText';
import Input from '../../components/shared/Input';

import {useMutation} from 'react-query';
import {Login, OtpApi} from '../../services/LoginRegisterApi';
import {useToast} from 'react-native-toast-notifications';
import {scale} from 'react-native-size-matters';
import RNRestart from 'react-native-restart';
import {Logo} from '../../components/shared/Icons'; // Import package from node modules
import NetInfo from '@react-native-community/netinfo';
import {ThemeChangeContext} from '../../context/theme';
import ROW from "../../components/shared/ROW";

// import NavigationBar from "react-native-navbar-color";

const WelcomeScreen = ({navigation}) => {
  const tost = useToast();
  const isLight = React.useContext(ThemeChangeContext);

  const [text, setText] = React.useState('');
  const [validate, setvalidate] = React.useState(true);
  const {mutateAsync, error, isLoading} = useMutation(token => OtpApi(token), {
    onError: error => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          tost.show('دوست عزیزم به اینترنت وصل نیستی!', {type: 'error_type'});
        } else {
          RNRestart.Restart();
        }
      });
    },
  });
  React.useEffect(() => {
    const handleColor = async () => {
      try {
        await changeNavigationBarColor('#ffffff');
      } catch (e) {}
    };
    handleColor();
  }, []);
  const onChangeText = e => {
    setText(e.replace(/\s/g, ''));
    setvalidate(!validateEmail(e.replace(/\s/g, '')));
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailaddress = re.test(String(email).toLowerCase());
    const num = /^-?[\d.]+(?:e-?\d+)?$/.test(email);
    if (email.length > 6) {
      if (emailaddress) {
        return true;
      }

      if (num) {
        if (email.length > 10 && email.length <= 11) {
          return true;
        }
      }
    }
    return false;
  }

  const submitButton = async () => {
    try {
      const token = new FormData();
      token.append('PhoneNumber', text);
      const res = await mutateAsync(token);

      if (res.status === 200) {
        console.log('e11',res.data);
        navigation.navigate('OtpScreen', {username: text, time: 60});
        /* if (res.data.tag == 'otp') {
                    navigation.navigate('OtpScreen',{username:text,time:res.data.time});
                } */
        /*  if (res.data.tag == 'enter_password') {
                    navigation.navigate('SingIpScreen',{username:text});
                } */
      }
    } catch (error) {
      console.log('e12',error);
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={{flex:1}} keyboardDismissMode='on-drag'>
      <ROW bg='#fff' p={25} flex justifycenter alingend>
        <ROW rowr>
        <Image
          style={{width: 120,height:120}}
          resizeMode={'contain'}
          source={require('../../assets/image/logo.png')}
        />
        </ROW>
        <TitleText
          color="#002A32"
          style={styles.title}
          title="سلام دوست عزیز‌م"
        />
        <SubText color="#858585" title="به زمین نو خوش اومدی" />
        <SubText
          color="#858585"
          style={styles.lable}
          title=" شماره همراه"
        />
        <Input
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          keyboardType={'number-pad'}
          returnKeyType={'done'}
          autoCapitalize="none"
        />
        <CustomButton
          style={styles.button}
          disabled={validate}
          onPress={submitButton}
          title={isLoading ? 'در حال بررسی ...' : 'ورود / ثبت‌نام'}
        />
      </ROW>
      </ScrollView>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  lable: {
    marginTop: scale(20),
    marginBottom: scale(10),
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
