const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const medicalRecordRoutes = require('./routes/medicalRecordRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://your-app.vercel.app'
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/medical-records', medicalRecordRoutes);
app.use('/api/ai', aiRoutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});