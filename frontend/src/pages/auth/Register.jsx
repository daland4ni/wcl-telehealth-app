import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
    <div className="min-h-screen bg-[#FCF7F8] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#BEBFC5] p-8">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-[#A31621]">
            Patient Registration
          </h1>

          <p className="text-[#4E8098] mt-2">
            Create your telehealth account
          </p>
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          />

          {/* PERSONAL INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

          </div>

          {/* PHYSICAL INFO */}
          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
            />

          </div>

          {/* MEDICAL HISTORY */}
          <textarea
            name="medicalHistory"
            placeholder="Basic Medical History"
            rows="5"
            value={formData.medicalHistory}
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098] resize-none"
          />

          {/* CONSENT */}
          <div className="space-y-4 bg-[#FCF7F8] border border-[#BEBFC5] rounded-2xl p-5">

            <label className="flex items-start gap-3 text-sm text-[#4E8098]">

              <input
                type="checkbox"
                name="certifyInformation"
                checked={formData.certifyInformation}
                onChange={handleChange}
                className="mt-1"
              />

              <span>
                I certify that all information provided is factual and accurate.
              </span>

            </label>

            <label className="flex items-start gap-3 text-sm text-[#4E8098]">

              <input
                type="checkbox"
                name="consentToDataSharing"
                checked={formData.consentToDataSharing}
                onChange={handleChange}
                className="mt-1"
              />

              <span>
                I consent to sharing my information with healthcare professionals.
              </span>

            </label>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-4 rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Patient Account'}
          </button>

        </form>

        {/* FOOTER */}
        <div className="text-center mt-6 space-y-2">

          <p className="text-sm text-[#4E8098]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#A31621] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

          <p className="text-sm text-[#4E8098]">
            Are you a doctor?{' '}
            <Link
              to="/doctor/register"
              className="text-[#A31621] font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;