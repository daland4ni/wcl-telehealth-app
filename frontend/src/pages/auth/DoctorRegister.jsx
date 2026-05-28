import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { register } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

import specializations from '../../data/specializations';

const DoctorRegister = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    licenseNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        role: 'doctor',
      };

      const data = await register(payload);

      localStorage.setItem(
        'user',
        JSON.stringify(data)
      );

      setUser(data);

      navigate('/doctor/dashboard');
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        'Registration failed'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF7F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#BEBFC5] p-8">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#A31621]">
            Doctor Registration
          </h1>

          <p className="text-[#4E8098] mt-2">
            Register as a healthcare provider
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
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
            <option value="">
              Select Specialization
            </option>

            {specializations.map(
              (specialization) => (
                <option
                  key={specialization}
                  value={specialization}
                >
                  {specialization}
                </option>
              )
            )}
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
            className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-4 rounded-2xl"
          >
            Create Doctor Account
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#4E8098]">
            Looking for patient registration?{' '}
            <Link
              to="/register"
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

export default DoctorRegister;