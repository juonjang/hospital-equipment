// src/api/axiosConfig.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5308', // หรือ URL ของเซิร์ฟเวอร์ของคุณ
});

// เพิ่ม Interceptor เพื่อใส่ Token ในทุกคำขอ
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // หรือที่คุณเก็บ Token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
