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

  const [error, setError] = useState('');
  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    // CLEAR ERROR WHILE TYPING
    if (error) {
      setError('');
    }
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError('');

      if (
        !formData.email ||
        !formData.password
      ) {
        setError(
          'Please complete all fields.'
        );

        return;
      }

      try {

        setLoading(true);

        const data =
          await login(formData);

        localStorage.setItem(
          'user',
          JSON.stringify(data)
        );

        setUser(data);

        if (
          data.role === 'doctor'
        ) {
          navigate(
            '/doctor/dashboard'
          );
        } else {
          navigate(
            '/patient/dashboard'
          );
        }

      } catch (error) {

        console.error(error);

        setError(
          error?.response?.data
            ?.message ||
          'Invalid email or password.'
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#FCF7F8] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-[#BEBFC5]">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[#A31621]">
            Welcome Back
          </h1>

          <p className="text-[#4E8098] mt-2">
            Login to continue your care journey
          </p>

        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#BEBFC5] rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A31621] hover:bg-red-800 transition text-white font-semibold py-3 rounded-2xl disabled:opacity-70"
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
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

          <p className="text-sm text-[#4E8098]">
            Are you a doctor?{' '}
            <Link
              to="/doctor/login"
              className="text-[#A31621] font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;