import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavbarHome = () => {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-[#BEBFC5]">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/images/vitacare_logo.png"
                        alt="VitaCare Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <h1 className="text-2xl font-extrabold tracking-tight text-[#A31621]">
                        VitaCare
                    </h1>
                </Link>

                {user ? (
                    <Link
                        to={
                            user.role === 'doctor'
                                ? '/doctor/dashboard'
                                : '/patient/dashboard'
                        }
                        className="bg-[#A31621] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-800 transition shadow-sm"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <nav className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="text-[#4E8098] font-semibold hover:text-[#A31621] transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-[#A31621] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-800 transition shadow-sm"
                        >
                            Get Started
                        </Link>
                    </nav>
                )}

            </div>
        </header>
    )
}

export default NavbarHome;