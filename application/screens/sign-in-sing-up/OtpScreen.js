import React, {useRef, useState, useEffect} from 'react';
import CustomButton from '../../components/shared/CustomButton';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import TitleText from '../../components/shared/TitleText';
import SubText from '../../components/shared/SubText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {scale} from 'react-native-size-matters';
import {useMutation, useQuery} from 'react-query';
import {
  getUserInfo,
  Login,
  OtpApi,
  setLoginCheck,
} from '../../services/LoginRegisterApi';

import {useToast} from 'react-native-toast-notifications';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import {ArrowBack, Back} from '../../components/shared/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setHederationToken} from '../../services/AuthApi';
import ROW from "../../components/shared/ROW";
const OtpScreen = ({navigation, route}) => {
  const tost = useToast();
  const {username} = route.params;
  const [ex, setex] = useState(false);
  const [code, setcode] = useState('');
  const {mutateAsync, error, isLoading} = useMutation(token => OtpApi(token));
  const {mutateAsync: topdata, isLoading: isloadingOtp} = useMutation(token =>
    Login(token),
  );
  const {mutateAsync: loginCheck, isLoading: isloadingLoginCheck} = useMutation(
    token2 => setLoginCheck(token2),
  );
  const {
    refetch: userInfo,
    data: userInfoData,
    isLoading: isLoadingUser,
    error: errorUser,
  } = useQuery('user', getUserInfo, {
    enabled: false,
    onSuccess(data) {
      console.log('user2', data?.data);
      async function oo(data2) {
        console.log('user', data2?.data);
        await AsyncStorage.setItem('user', JSON.stringify(data2?.data));
      }
      oo(data);
    },
  });

  const handelresend = async () => {
    try {
      const token = new FormData();
      token.append('PhoneNumber', username);

      const res = await mutateAsync(token);
      if (res.status === 200) {
        setex(false);
        tost.show('کد تایید با موفقیت ارسال شد', {
          type: 'sucess_type',
        });
        setex(false);
      }
    } catch (e) {
      tost.show('مشکلی در ارسال کد پیش آمده است', {
        type: 'error_type',
      });
    }
  };
  const handelsendOtp = async () => {
    if (code.length === 5) {
      try {
        /* const token = await jwt
                    .sign(
                        {
                            username: username,
                            confirm: parseInt(code),
                            register: 'True',
                        }, // body
                        '!u7__ki5rpou^+x8ny@v^d-2r6*(!o#q!(s0^4ext54t2_crwf', // secret
                        {
                            alg: 'HS256',
                        },
                    ); */
        const token = new FormData();
        token.append('PhoneNumber', username);
        token.append('ValidationCode', parseInt(code));
        //token.append('FullName', 'کاربر');
        //token.append('MerchantId', 9);
        const res = await topdata(token);

        if (res.data) {
          const res2 = await loginCheck(username);

          console.log('login', res.data);
          console.log('step3');
          await AsyncStorage.setItem('token', username);
          await AsyncStorage.setItem('user', JSON.stringify(res.data));

          //const value = await AsyncStorage.getItem('user');
          //console.log(value);
          // if (value !== null) {
          //   console.log(value);
          //   //setUser({ user: value, isLoading: false, refetch: null, error: null })
          // } else {
          //   userInfo();
          // }

          console.log('step0');
          setHederationToken(username);
          console.log('step1');
          // axios.defaults.headers.common['Authorization'] = `Token ${username}`;
          navigation.replace('Home');
          console.log('step2');
          isLight(true);
          tost.show('به زمین نو خوش آمدید ', {
            type: 'sucess_type',
          });
          /*  navigation.replace('SingUpScreen', {
                         password: code,
                         username: username,
                     }); */
        }
        if (res.data.error) {
          tost.show(res.data.error, {
            type: 'error_type',
          });
        }
      } catch (e) {}
    }
  };
  const refTimer = useRef();

  // For keeping a track on the Timer
  // const [timerEnd, setTimerEnd] = useState(false);

  const timerCallbackFunc = timerFlag => {
    // Setting timer flag to finished
    setex(timerFlag);
  };
  return (
    <View style={{
      position: 'relative',
      backgroundColor: '#ffffff',
      flex: 1,
      justifyContent: 'center',
      padding: 25,
    }}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{flex: 1, paddingVertical: 25}}>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Back color="#002A32" />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 4}}>
        <ROW alingend>
        <TitleText
          color="#002A32"
          style={styles.title2}
          title="کد تایید رو وارد کن"
        />
        {/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) ? (
          <SubText color="#858585" title=" این کد به ایمیل‌ت فرستاده شد" />
        ) : (
          <SubText color="#858585" title=" این کد به شمار‌ت فرستاده شد" />
        )}
        </ROW>
        <OTPInputView
          style={{width: '100%', height: scale(100)}}
          pinCount={5}
          // code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {id => setcode(id)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={id => {
            setcode(id);
            handelsendOtp();
          }}
        />
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(-12),
          }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
              <SubText
                color="#858585"
                style={styles.edit}
                size={scale(10)}
                title="ویرایش شماره "
              />
              <ArrowBack />
            </View>
          </TouchableWithoutFeedback>
          {ex ? (
            isLoading ? (
              <View>
                <SubText
                  color="#858585"
                  size={scale(10)}
                  title="در حال ارسال کد..."
                />
              </View>
            ) : (
              <TouchableWithoutFeedback onPress={handelresend}>
                <View>
                  <SubText
                    color="#858585"
                    size={scale(10)}
                    style={styles.edit}
                    title="ارسال مجدد"
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          ) : (
            <CountDownTimer
              ref={refTimer}
              timestamp={120}
              timerCallback={timerCallbackFunc}
              containerStyle={{}}
              textStyle={{
                fontSize: scale(9),
                color: '#858585',
              }}
            />
          )}
        </View>
        {isloadingOtp ? (
          <CustomButton
            style={styles.button}
            disabled={true}
            onPress={() => {}}
            title="در حال بررسی ..."
          />
        ) : ex ? (
          <CustomButton
            style={styles.button}
            disabled
            onPress={handelsendOtp}
            title="تایید"
          />
        ) : (
          <CustomButton
            style={styles.button}
            onPress={handelsendOtp}
            title="تایید"
          />
        )}

        <Text style={styles.protocol}>
          با ورود یا ثبت‌نام در زمین نو به‌طور خودکار با
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL('https://zamineno.com/terms/');
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
          زمین نو موافقت می‌کنید
        </Text>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  underlineStyleBase: {
    height: scale(47),

    width: scale(47),
    padding: 12,
    textAlign: 'center',
    fontFamily: 'Shabnam-FD',
    fontSize: 16,
    color: '#002A32',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
  },

  underlineStyleHighLighted: {
    borderWidth: 2,
    borderColor: '#03DAC6',
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

  forget: {
    display: 'flex',
    marginTop: scale(20),
    marginRight: scale(5),
    textDecorationLine: 'underline',
  },
  edit: {
    marginLeft: scale(5),
    textDecorationLine: 'underline',
  },

  title2: {
    marginBottom: scale(3),
    marginTop: scale(20),
  },

  button: {
    marginTop: scale(15),
  },
});
