import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

      alert(
        error?.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF7F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#BEBFC5]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#A31621]">
            Welcome Back
          </h1>

          <p className="text-[#4E8098] mt-2">
            Login to continue your care journey
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          />

          <button
            type="submit"
            className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#4E8098] mt-6">
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
  );
};

export default Login;