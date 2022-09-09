import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Platform} from 'react-native';

const getData = async () => {
  try {
    axios.defaults.headers.common.Authorization =
      'c029baa9-8679-4fd3-8f44-2758146be764';


    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {}
};
getData();
export const Login = async token => {
  await getData();
  return await axios.post('https://api.zamineno.com/otp', token);
};
export const setLoginCheck = async token => {
  //const token = await getData();
  await getData();
  console.log('e13',token);
  return await axios.post('https://api.zamineno.com/loginCheck', {
    Token: token,
    device_id: getDeviceId() + token,
    type: Platform.OS,
  });
};
export const getLoginCheck = async () => {
  const token = await getData();
  return await axios.get('https://api.zamineno.com/loginCheck', {
    params: {Token: token, device_id: getDeviceId() + token, type: Platform.OS},
  });
};
export const setUserInfo = async data => {
  //const token = await getData();
  await getData();

  return await axios.post('https://api.zamineno.com/updateUser', data);
};
export const getUserInfo = async () => {
  const token = await getData();
  return await axios.get('https://api.zamineno.com/getUserInfo', {
    params: {Token: token},
  });
};

export const LoginOut = token => {
  return axios.delete(`https://chekida.com/api/app/auth/${token}/`);
};
export const LoginPassword = token => {
  return axios.put(`https://chekida.com/api/app/auth/${token}/`);
};
export const OtpApi = token => {
  console.log('token', token);
  return axios.post('https://core.zamineno.com/api/Auth/SendCode', token, {
    headers: {'content-type': 'application/x-www-form-urlencoded'},
  });
};
export const registerApi = token => {
  return axios.post(`https://chekida.com/api/app/auth/register/${token}/`);
};
export const forgetPassword = token => {
  return axios.post(
    `https://chekida.com/api/app/auth/forget-password/${token}/`,
  );
};
export const changePassword = token => {
  return axios.post(
    `https://chekida.com/api/app/auth/change_password/${token}/`,
  );
};
