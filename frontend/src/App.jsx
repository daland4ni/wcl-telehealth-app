import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import DoctorRegister from './pages/auth/DoctorRegister';

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDirectory from './pages/patient/DoctorDirectory';
import DoctorAppointmentHistory from './pages/doctor/DoctorAppointmentHistory';
import PatientAppointmentHistory from './pages/patient/PatientAppointmentHistory';


import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />

        <Route path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/patient/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorDirectory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/history"
          element={
            <ProtectedRoute>
              <DoctorAppointmentHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/history"
          element={
            <ProtectedRoute>
              <PatientAppointmentHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;