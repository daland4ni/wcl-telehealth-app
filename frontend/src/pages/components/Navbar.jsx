const Navbar = ({user, logout}) => {
return (
    <header className="bg-white border-b border-[#BEBFC5] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-[#A31621]">
                    Pulse One
                </h1>

                <p className="text-[#4E8098] text-sm mt-1">
                    Welcome back, {user?.name}
                </p>
            </div>

            <button
                onClick={logout}
                className="bg-[#A31621] hover:bg-red-800 text-white px-5 py-2 rounded-xl transition font-medium"
            >
                Logout
            </button>
        </div>
    </header>
)
}

export default Navbar;