// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthProvider } from './context/AuthContext';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8343', // สีหลักของคุณ
      dark: '#EEF7FF',
      light: '#F1DEC6',
    },
    background: {
      default: '#f5f5f5', // พื้นหลังของเนื้อหา
      paper: '#ffffff',   // พื้นหลังของกระดาษหรือการ์ด
    },
    // คุณสามารถปรับแต่งสีอื่น ๆ ได้ตามต้องการ
  },
  typography: {
    // ปรับแต่งฟอนต์และสไตล์ตัวอักษร
    fontFamily: 'Prompt,Kanit' // หรือฟอนต์ที่คุณต้องการ
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
