// src/components/StatCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, value, color }) {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: color, color: '#fff' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
