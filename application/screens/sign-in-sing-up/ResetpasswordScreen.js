import React, {useRef, useState, useEffect} from 'react';
import CustomButton from '../../components/shared/CustomButton';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  I18nManager,
  Linking,
} from 'react-native';
import TitleText from '../../components/shared/TitleText';
import SubText from '../../components/shared/SubText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {scale} from 'react-native-size-matters';
import CountDownTimer from 'react-native-countdown-timer-hooks';

import {useMutation} from 'react-query';
import {forgetPassword, OtpApi} from '../../services/LoginRegisterApi';

import {useToast} from 'react-native-toast-notifications';
import {SafeAreaView} from 'react-native-safe-area-context';
import isNumeric from '../../utils/CheckNumberOrEmail';
import {ArrowBack, Back} from '../../components/shared/Icons';

const ResetpasswordScreen = ({navigation, route}) => {
  const tost = useToast();
  const {username, time} = route.params;
  const [usernamestate, setusername] = useState(username);
  const [extime, setextime] = useState(time);
  const [ex, setex] = useState(false);
  const [code, setcode] = useState('');
  const {
    mutateAsync: forgetpass,
    error,
    isLoading,
  } = useMutation(token => forgetPassword(token));
  const {mutateAsync: topdata, isLoading: isloadingOtp} = useMutation(token =>
    OtpApi(token),
  );
  const handelresend = async () => {
    try {

      const res = await forgetpass('');

      if (res.status === 200) {
        setex(false);
        tost.show('کد تایید با موفقیت ارسال شد', {
          type: 'sucess_type',
        });
        setex(false);
        setextime(res.data.time);
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

        const res = await topdata('');

        if (res.data.tag === 'new_password') {
          navigation.replace('changePasswordScreen', {
            username: usernamestate,
          });
        } else {
          tost.show(res.data.error, {
            type: 'error_type',
          });
        }
        setcode('');
      } catch (e) {
        setcode('');
      }
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Back color="#002A32" />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{flex: 4}}>
        <TitleText
          color="#002A32"
          style={styles.title2}
          title="کد تایید رو وارد کن"
        />
        {/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) ? (
          <SubText color="#858585" title=" این کد به ایمیل‌ت فرستاده شد" />
        ) : (
          <SubText color="#858585" title=" این کد به شماره‌ت فرستاده شد" />
        )}
        <OTPInputView
          style={{width: '100%', height: scale(100)}}
          pinCount={5}
          // code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {id => setcode(id)}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={id => {
            setcode(id);
            handelsendOtp();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scale(-12),
          }}>
          {ex ? (
            isLoading ? (
              <View>
                <SubText color="#858585" title="در حال ارسال کد..." />
              </View>
            ) : (
              <TouchableWithoutFeedback onPress={handelresend}>
                <View>
                  <SubText
                    color="#858585"
                    style={styles.edit}
                    title="ارسال مجدد"
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          ) : (
            <CountDownTimer
              ref={refTimer}
              timestamp={extime}
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
      </View>
    </View>
  );
};

export default ResetpasswordScreen;

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
