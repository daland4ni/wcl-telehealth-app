import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import NavbarHome from '../components/NavbarHome';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
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

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please complete all fields.');
      return;
    }

    try {
      setLoading(true);

      const data = await login(formData);

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      if (data.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }

    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.message ||
        'Invalid email or password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-10 bg-gradient-to-br from-[#F6F8FB] via-[#EEF3F7] to-[#F8FAFC]">

        {/* BACKGROUND BLOBS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] bg-[#A31621] opacity-10 blur-3xl rounded-full top-[-120px] left-[-120px]" />
          <div className="absolute w-[600px] h-[600px] bg-[#4E8098] opacity-10 blur-3xl rounded-full bottom-[-180px] right-[-180px]" />
        </div>

        {/* MAIN CARD */}
        <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl border border-[#BEBFC5] shadow-2xl rounded-3xl overflow-hidden">

          {/* LEFT PANEL (branding) */}
          <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-[#A31621] to-[#7c111a] text-white">

            <h1 className="text-4xl font-bold">
              VitaCare
            </h1>

            <p className="mt-4 text-white/80 text-lg">
              Telehealth made simple, secure, and instant.
            </p>

            <div className="mt-10 space-y-3 text-sm text-white/80">
              <p>✔ Instant doctor access</p>
              <p>✔ Secure patient records</p>
              <p>✔ AI-assisted triage</p>
            </div>

            <div className="mt-10 text-xs text-white/60">
              “Healthcare that feels modern, not stressful.”
            </div>

          </div>

          {/* RIGHT PANEL (form) */}
          <div className="p-10">

            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#A31621]">
                Welcome Back
              </h2>

              <p className="text-[#4E8098] mt-2">
                Sign in to continue your care journey
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-3 rounded-2xl disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            {/* FOOTER */}
            <div className="text-center mt-6 space-y-2">

              <p className="text-sm text-[#4E8098]">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#A31621] font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Login;