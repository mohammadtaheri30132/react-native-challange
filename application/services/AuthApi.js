import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    axios.defaults.headers.common.Authorization =
      'c029baa9-8679-4fd3-8f44-2758146be764';
    axios.defaults.headers.common.Accept = 'application/json';
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      axios.defaults.headers.common.Authorization = `Token ${value}`;
      return value;
    }
  } catch (e) {}
};
export const setHederationToken = async token => {
  axios.defaults.headers.common.Authorization =
    'c029baa9-8679-4fd3-8f44-2758146be764';
  axios.defaults.headers.common.Accept = 'application/json';
  try {


  } catch (e) {}
};
getData();

axios.interceptors.response.use(null, error => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
  }

  return Promise.reject(error);
});

export const getGift = async () => {
  const token = await getData();
  return await axios.get('https://core.zamineno.com/api/Courses/GetDetails', {
    params: {Id: 2, Token: token},
  });
};

export const getPackage = async id => {
  const token = await getData();
  return await axios.get('https://core.zamineno.com/api/Courses/GetDetails', {
    params: {Id: id, Token: token},
  });
};

export const getPackages = async () => {
  const token = await getData();
  return await axios.get('https://core.zamineno.com/api/Courses/GetCourses', {
    params: {Token: token},
  });
};

export const payCourse = async id => {
  const token = await getData();
  return await axios.get('https://core.zamineno.com/api/Courses/Pay', {
    params: {CourseId: id, Token: token},
  });
};

export const getProfile = async () => {
  return await axios.get('https://chekida.com/api/app/profile/');
};
export const getCategory = async () => {
  return await axios.get('https://chekida.com/api/app/category/list/');
};
export const otpPay = async () => {
  return await axios.post('https://chekida.com/api/app/profile/account/otp/');
};
export const requestPay = async data => {
  return await axios.get(
    `https://chekida.com/api/app/profile/account/otp/?code=${data.code}&inventory=${data.amunt}`,
  );
};

export const cartEnter = async data => {
  return await axios.get(
    `https://chekida.com/api/app/profile/account/?cart=${data.cart}&name=${data.name}`,
    {},
  );
};

export const changeProfile = async data => {
  return await axios.post('https://chekida.com/api/app/profile/', data);
};
export const ResetPsswordProfile = async data => {
  return await axios.put('https://chekida.com/api/app/profile/', data);
};

export const getBook = async id => {
  return await axios.get(`https://chekida.com/api/app/summary/${id}/`);
};
export const readPage = async data => {
  return await axios.post(
    `https://chekida.com/api/app/library/summary/${data.id}/`,
    data.page,
  );
};

export const downloadTask = async data => {
  return await axios.put('https://chekida.com/api/app/library/summary/2/');
};
export const infoCard = async () => {
  return await axios.get('https://chekida.com/api/app/profile/account/');
};

export const getCoupon = async code => {
  return await axios.post('https://chekida.com/api/app/coupon/', code);
};
export const Pay = async token => {
  return await axios.post('https://chekida.com/api/app/order/', token);
};
export const getPlan = async id => {
  return await axios.get('https://chekida.com/api/app/plan/');
};
export const getLibrary = async () => {
  return await axios.get('https://chekida.com/api/app/library/');
};
export const deleteBookLibrary = async book => {
  return await axios.delete('https://chekida.com/api/app/library/', {
    data: book,
  });
};
export const searchBook = async name => {
  return await axios.get(`https://chekida.com/api/app/search/${name}/`);
};
export const AddComment = async token => {
  return await axios.post(
    `https://chekida.com/api/app/summary-comment/${token}`,
  );
};
export const AddTicket = async token => {
  return await axios.post('https://chekida.com/api/app/ticket/', token);
};
export const BookReaderApi = async id => {
  return await axios.get(`https://chekida.com/api/app/library/summary/${id}/`);
};
export const userOrder = async () => {
  return await axios.get('https://chekida.com/api/app/order/');
};
export const morePost = async name => {
  return await axios.post(`https://chekida.com${name}/`);
};
