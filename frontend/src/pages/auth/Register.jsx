import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import NavbarHome from '../components/NavbarHome';

const Register = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    contactNumber: '',
    height: '',
    weight: '',
    medicalHistory: '',
    certifyInformation: false,
    consentToDataSharing: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (error) setError('');
  };

  if (user?.role === 'doctor') {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  if (user?.role === 'patient') {
    return <Navigate to="/patient/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.certifyInformation || !formData.consentToDataSharing) {
      setError('You must agree to all certifications before continuing.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: 'patient',
      };

      const data = await register(payload);

      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      navigate('/patient/dashboard');

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
        'Registration failed. Please check your inputs and try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-[#F6F8FB] via-[#EEF3F7] to-[#F8FAFC]">
        {/* BACKGROUND DECOR */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

          {/* soft blob 1 */}
          <div className="absolute w-[500px] h-[500px] bg-[#A31621] opacity-20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
          {/* soft blob 2 */}
          <div className="absolute w-[600px] h-[600px] bg-[#4E8098] opacity-20 blur-3xl rounded-full bottom-[-180px] right-[-180px]" />
          {/* subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

        </div>

        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

          {/* LEFT PANEL (branding / trust / info) */}
          <div className="hidden md:flex flex-col justify-center p-10 rounded-3xl bg-gradient-to-br from-[#A31621] to-[#4E8098] text-white shadow-xl">

            <h1 className="text-4xl font-extrabold leading-tight">
              VitaCare: Join a smarter way to access healthcare
            </h1>

            <p className="mt-4 text-white/80">
              Connect with licensed doctors, store your medical records securely,
              and get care anytime, anywhere.
            </p>

            <div className="mt-8 space-y-4 text-sm text-white/90">

              <div className="flex gap-2">
                <span>✔</span>
                <p>End-to-end encrypted medical data</p>
              </div>

              <div className="flex gap-2">
                <span>✔</span>
                <p>Verified healthcare professionals only</p>
              </div>

              <div className="flex gap-2">
                <span>✔</span>
                <p>Instant consultations & booking system</p>
              </div>

            </div>

          </div>

          {/* RIGHT PANEL (FORM CARD) */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
            {/* HEADER STRIP */}
            <div className="bg-[#A31621] text-white px-6 py-5">
              <h2 className="text-2xl font-bold">Patient Registration</h2>
              <p className="text-sm opacity-90">
                Create your secure telehealth profile
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}

              {/* ACCOUNT */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase">
                  Account
                </p>

                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

                <input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />
              </div>

              {/* PERSONAL GRID */}
              <div className="grid grid-cols-2 gap-4">

                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

                <input
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

                <input
                  name="height"
                  placeholder="Height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

                <input
                  name="weight"
                  placeholder="Weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
                />

              </div>

              {/* MEDICAL */}
              <textarea
                name="medicalHistory"
                rows="4"
                placeholder="Medical history / conditions / allergies"
                value={formData.medicalHistory}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#4E8098]"
              />

              {/* CONSENT */}
              <div className="bg-gray-50 border rounded-2xl p-4 space-y-3">

                <label className="flex gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="certifyInformation"
                    checked={formData.certifyInformation}
                    onChange={handleChange}
                  />
                  I confirm my information is accurate
                </label>

                <label className="flex gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="consentToDataSharing"
                    checked={formData.consentToDataSharing}
                    onChange={handleChange}
                  />
                  I consent to data sharing with doctors
                </label>

              </div>

              {/* SUBMIT */}
              <button
                disabled={loading}
                className="w-full bg-[#A31621] text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <div className="text-center mt-6 space-y-3">

                <div className="flex justify-center items-center text-sm text-[#4E8098]">
                  <span>Already have an account?</span>
                  <Link
                    to="/login"
                    className="ml-1 text-[#A31621] font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </div>

                <div className="flex justify-center items-center text-sm text-[#4E8098]">
                  <span>Are you a doctor?</span>
                  <Link
                    to="/doctor/register/"
                    className="ml-1 text-[#A31621] font-semibold hover:underline"
                  >
                    Register here
                  </Link>
                </div>

              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Register;