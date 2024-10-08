import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
  useTheme,
  Avatar,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  CleaningServices as CleaningServicesIcon,
  Quiz as QuizIcon,
  Report as ReportIcon,
  AddCircle as AddCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

import { AuthContext } from '../context/AuthContext';

function MainLayout({ children }) {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme(); // ใช้ธีมของ Material-UI

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'แดชบอร์ด', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'ตรวจสอบอุปกรณ์', icon: <SearchIcon />, path: '/equipment-check' },
    { text: 'สถิติการใช้งาน', icon: <BarChartIcon />, path: '/usage-statistics' },
    { text: 'การทำความสะอาด', icon: <CleaningServicesIcon />, path: '/cleaning' },
    { text: 'สร้างแบบสอบถาม', icon: <QuizIcon />, path: '/SurveyPage' },
    { text: 'รายงาน', icon: <ReportIcon />, path: '/ReportPage' },
    { text: 'เพิ่มอุปกรณ์', icon: <AddCircleIcon />, path: '/add-equipment' },
    { text: 'อุปกรณ์', icon: <AddCircleIcon />, path: '/EquipmentList' },
    // เพิ่มปุ่มออกจากระบบในเมนู
    { text: 'ออกจากระบบ', icon: <LogoutIcon />, action: handleLogout },
  ];

  const drawer = (
    <div>
      {/* เพิ่ม Toolbar เพื่อเลื่อนเนื้อหาลงมาพ้น AppBar */}
      <Toolbar />
      {/* เพิ่ม Avatar ใน Box และจัดตำแหน่งให้กึ่งกลาง */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
        <Avatar sx={{ width: 130, height: 100 }} src="/logo_nb.png" alt="Logo" />
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              } else if (item.action) {
                item.action();
              }
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'primary.dark',
          // เพิ่มความสูงของ AppBar
          height: 60,
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          {/* แสดงปุ่มเมนูบนมือถือ */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* ชื่อแอป */}
          <Typography variant="h5" color='#053B50' noWrap component="div" sx={{ flexGrow: 1 }}>
            Hospital Equipment App
          </Typography>
          {/* ปุ่มออกจากระบบถูกย้ายไปที่ Drawer แล้ว */}
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer บนอุปกรณ์มือถือ */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: { backgroundColor: 'background.paper' },
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer บนอุปกรณ์ขนาดใหญ่ */}
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: { backgroundColor: 'background.paper' },
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* เพิ่ม Padding ด้านบนให้สอดคล้องกับความสูงของ AppBar */}
        <Toolbar sx={{ minHeight: 70 }} />
        {/* แสดงเนื้อหาของแต่ละหน้า */}
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;
