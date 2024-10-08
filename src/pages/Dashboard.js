import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axiosConfig';
import { Typography, Box, Grid } from '@mui/material';

import StatCard from '../components/StatCard';

function Dashboard() {
  const { userData } = useContext(AuthContext); // ดึงข้อมูล userData จาก context
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    // ดึงข้อมูลสถิติ
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/reports/statistics');
        console.log('Statistics data:', response.data);
        // ปรับโครงสร้างข้อมูลสำหรับกราฟ
        const chartData = response.data.labels.map((date, index) => ({
          date,
          checks: response.data.checkData[index],
          cleans: response.data.cleanData[index],
        }));
        setStatistics({ ...response.data, chartData });
      } catch (err) {
        console.error('Failed to fetch statistics', err);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      {/* แสดงชื่อผู้ใช้ */}
      <Typography variant="h4" gutterBottom>
        ยินดีต้อนรับ, {userData?.username || 'ไม่พบชื่อผู้ใช้'}
      </Typography>
      {/* การ์ดสถิติ */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="อุปกรณ์ทั้งหมด"
              value={statistics.totalEquipment || 0}
              color="#0d47a1"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="การตรวจสอบวันนี้"
              value={statistics.checksToday || 0}
              color="#1b5e20"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="การทำความสะอาดวันนี้"
              value={statistics.cleaningsToday || 0}
              color="#e65100"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Dashboard;
