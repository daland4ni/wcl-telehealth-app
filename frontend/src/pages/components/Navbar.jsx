import { Link } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
    return (
        <header className="bg-white border-b border-[#BEBFC5] px-6 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-4">
                        <img
                            src="/images/vitacare_logo.png"
                            alt="VitaCare Logo"
                            className="w-12 h-12 object-contain"
                        />
                    </Link>
                    <Link to={
                        user.role === 'doctor'
                            ? '/doctor/dashboard'
                            : '/patient/dashboard'
                    }>

                        <h1 className="text-2xl font-bold text-[#A31621]">
                            VitaCare
                        </h1>

                        <p className="text-[#4E8098] text-sm mt-1">
                            Welcome back, {user?.name}
                        </p>

                    </Link>
                </div>

                <div className="flex justify-end items-center gap-4">
                    <Link
                        to="/profile/edit"
                        className="text-[#4E8098] hover:text-[#A31621] transition"
                    >
                        Edit Profile
                    </Link>

                    <button
                        onClick={logout}
                        className="bg-[#A31621] hover:bg-red-800 text-white px-5 py-2 rounded-xl transition font-medium"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </header>
    )
}

export default Navbar;