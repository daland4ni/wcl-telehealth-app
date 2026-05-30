import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

import specializations from '../../data/specializations';
import NavbarHome from '../components/NavbarHome';

const DoctorRegister = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    licenseNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  if (user?.role === 'doctor') {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  if (user?.role === 'patient') {
    return <Navigate to="/patient/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.specialization ||
      !formData.licenseNumber
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const payload = {
        ...formData,
        role: 'doctor',
      };

      const data = await register(payload);

      setSuccess('Registration successful! Redirecting...');

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      setTimeout(() => {
        navigate('/doctor/dashboard');
      }, 1000);

    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-[#F6F8FB] via-[#EEF3F7] to-[#F8FAFC]">

        {/* BACKGROUND BLUR BLOBS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-[#A31621] opacity-10 blur-3xl rounded-full top-[-120px] left-[-120px]" />
          <div className="absolute w-[600px] h-[600px] bg-[#4E8098] opacity-10 blur-3xl rounded-full bottom-[-180px] right-[-180px]" />
        </div>

        {/* MAIN CARD */}
        <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl border border-[#BEBFC5] shadow-2xl rounded-3xl overflow-hidden">

          {/* LEFT PANEL (branding) */}
          <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-[#4E8098] to-[#2f5c6d] text-white">

            <h1 className="text-4xl font-bold">
              Doctor Portal
            </h1>

            <p className="mt-4 text-white/80 text-lg">
              Join a growing network of licensed healthcare providers.
            </p>

            <div className="mt-10 space-y-3 text-sm text-white/80">
              <p>✔ Manage patient consultations</p>
              <p>✔ Create medical records</p>
              <p>✔ Set availability schedules</p>
            </div>

            <div className="mt-10 text-xs text-white/60">
              “Better tools for better care.”
            </div>

          </div>

          {/* RIGHT PANEL (form) */}
          <div className="p-10">

            {/* HEADER */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#A31621]">
                Doctor Registration
              </h1>

              <p className="text-[#4E8098] mt-2">
                Register as a licensed healthcare provider
              </p>
            </div>

            {/* ERROR HANDLING */}
            {error && (
              <div className="mb-4 p-4 rounded-2xl border border-red-200 bg-red-50">
                <p className="text-sm font-medium text-red-700">
                  {error}
                </p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 rounded-2xl border border-green-200 bg-green-50">
                <p className="text-sm font-medium text-green-700">
                  {success}
                </p>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
              />

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
              >
                <option value="">Select Specialization</option>
                {specializations.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-3 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Creating Account...'
                  : 'Create Doctor Account'}
              </button>

            </form>

            {/* FOOTER LINKS */}
            <div className="text-center mt-6 space-y-3">

              <div className="flex justify-center text-sm text-[#4E8098]">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="ml-1 text-[#A31621] font-semibold hover:underline"
                >
                  Login
                </Link>
              </div>

              <div className="flex justify-center text-sm text-[#4E8098]">
                <span>Looking for patient registration?</span>
                <Link
                  to="/register"
                  className="ml-1 text-[#A31621] font-semibold hover:underline"
                >
                  Register here
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorRegister;