import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import EquipmentCheck from './pages/EquipmentCheck';
import UsageStatistics from './pages/UsageStatistics';
import Cleaning from './pages/Cleaning';
import SurveyPage from './pages/SurveyPage';
import ReportPage from './pages/ReportPage';
import AddEquipment from './pages/AddEquipment';
import EquipmentList from './pages/EquipmentList';

import './App.css';

import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login และ Register */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* เส้นทางที่ต้องการการเข้าสู่ระบบ */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/equipment-check"
          element={
            <PrivateRoute>
              <MainLayout>
                <EquipmentCheck />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/usage-statistics"
          element={
            <PrivateRoute>
              <MainLayout>
                <UsageStatistics />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cleaning"
          element={
            <PrivateRoute>
              <MainLayout>
                <Cleaning />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/SurveyPage"
          element={
            <PrivateRoute>
              <MainLayout>
                <SurveyPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ReportPage"
          element={
            <PrivateRoute>
              <MainLayout>
                <ReportPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-equipment"
          element={
            <PrivateRoute>
              <MainLayout>
                <AddEquipment />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/EquipmentList"
          element={
            <PrivateRoute>
              <MainLayout>
                <EquipmentList />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* เส้นทางเริ่มต้น */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
