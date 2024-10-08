// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

// นำเข้า Material-UI Components
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // เพิ่ม state สำหรับ email
  const [phoneNumber, setPhoneNumber] = useState(''); // เพิ่ม state สำหรับ phone_number
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!username || !password || !email || !phoneNumber) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // สามารถเพิ่มการตรวจสอบความถูกต้องของอีเมลและเบอร์โทรศัพท์ในฝั่งลูกค้าได้

    try {
      // รีเซ็ตข้อผิดพลาดก่อนเริ่มการร้องขอ
      setError('');
      await axios.post('/api/auth/register', {
        username,
        password,
        email,
        phone_number: phoneNumber,
      });
      // หลังจากสมัครสมาชิกสำเร็จ นำผู้ใช้ไปยังหน้า Login
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      setError(err.response?.data?.message || 'ไม่สามารถสมัครสมาชิกได้ โปรดลองใหม่อีกครั้ง');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          สมัครสมาชิก
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* ช่องกรอกชื่อผู้ใช้ */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="ชื่อผู้ใช้"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* ช่องกรอกอีเมล */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="อีเมล"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* ช่องกรอกเบอร์โทรศัพท์ */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="เบอร์โทรศัพท์"
            name="phoneNumber"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* ช่องกรอกรหัสผ่าน */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* ปุ่มสมัครสมาชิก */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            สมัครสมาชิก
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* ลิงก์สำหรับเข้าสู่ระบบ */}
              <Link href="/login" variant="body2">
                มีบัญชีผู้ใช้อยู่แล้ว? เข้าสู่ระบบ
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
