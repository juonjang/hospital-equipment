// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import axios from '../api/axiosConfig';

// // นำเข้า Material-UI Components
// import {
//   Avatar,
//   Button,
//   TextField,
//   Link,
//   Grid,
//   Box,
//   Typography,
//   Container,
//   Alert,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', {
//         username,
//         password,
//       });

//       // ดึง token และ username จาก response ของ backend
//       const { token, username: loggedInUsername } = response.data; // ใช้ "loggedInUsername" เพื่อเลี่ยงการชนกับตัวแปร "username"

//       // บันทึก token และ username ลงใน AuthContext และ localStorage
//       login(token, loggedInUsername);

//       // นำไปยังหน้า dashboard
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Login failed', err);
//       setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           เข้าสู่ระบบ
//         </Typography>
//         {error && (
//           <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
//             {error}
//           </Alert>
//         )}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="ชื่อผู้ใช้"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="รหัสผ่าน"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {/* ปุ่มเข้าสู่ระบบ */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             เข้าสู่ระบบ
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               {/* ลิงก์สำหรับลืมรหัสผ่าน */}
//               <Link href="#" variant="body2">
//                 ลืมรหัสผ่าน?
//               </Link>
//             </Grid>
//             <Grid item>
//               {/* ลิงก์สำหรับสมัครสมาชิก */}
//               <Link href="/register" variant="body2">
//                 {"ยังไม่มีบัญชีผู้ใช้? สมัครสมาชิก"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// }

// export default LoginPage;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });
  
      // Rename destructured username to avoid conflict
      const { token, username: responseUsername } = response.data;
  
      // บันทึก token และ responseUsername ลงใน AuthContext และ localStorage
      login(token, responseUsername);
  
      // นำไปยังหน้า dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
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
          เข้าสู่ระบบ
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* ปุ่มเข้าสู่ระบบ */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            เข้าสู่ระบบ
          </Button>
          <Grid container>
            <Grid item xs>
              {/* ลิงก์สำหรับลืมรหัสผ่าน */}
              <Link href="#" variant="body2">
                ลืมรหัสผ่าน?
              </Link>
            </Grid>
            <Grid item>
              {/* ลิงก์สำหรับสมัครสมาชิก */}
              <Link href="/register" variant="body2">
                {"ยังไม่มีบัญชีผู้ใช้? สมัครสมาชิก"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
