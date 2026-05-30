import { Link } from "react-router-dom";
import NavbarHome from "./components/NavbarHome";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FCF7F8] text-gray-900">
      <NavbarHome />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 bg-white border border-[#BEBFC5] px-4 py-2 rounded-full text-sm text-[#4E8098] shadow-sm">
            🩺 Telehealth made simple
          </div>

          <h2 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-[#A31621]">
            Healthcare that feels
            <span className="text-[#4E8098]"> instant.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            Book doctors, get AI-powered guidance, and manage your medical records — all without waiting rooms or hospital stress.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            {!user && (
              <div className="flex items-center gap-4">
                <Link
                  to="/register"
                  className="bg-[#A31621] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-800 transition shadow-md"
                >
                  Start as Patient
                </Link>

                <Link
                  to="/doctor/register/"
                  className="bg-white border border-[#4E8098] text-[#4E8098] px-6 py-3 rounded-2xl font-semibold hover:bg-[#4E8098] hover:text-white transition"
                >
                  Join as Doctor
                </Link>
              </div>
            )}

          </div>

          {/* TRUST ROW */}
          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <span>✔ Secure records</span>
            <span>✔ Verified doctors</span>
            <span>✔ AI-assisted triage</span>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">

          <div className="absolute -inset-4 bg-gradient-to-tr from-[#A31621]/10 to-[#4E8098]/10 blur-2xl rounded-3xl"></div>

          <div className="relative bg-white rounded-3xl overflow-hidden border border-[#BEBFC5] shadow-xl">

            <img
              src="/images/patient_laptop.jpg"
              alt="Telehealth consultation"
              className="w-full h-[420px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h3 className="text-3xl font-bold text-[#A31621] mb-10">
          Built for modern healthcare
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Instant Doctor Access",
              desc: "Find specialists and book consultations in seconds."
            },
            {
              title: "AI Health Guidance",
              desc: "Get intelligent recommendations based on symptoms."
            },
            {
              title: "Unified Medical Records",
              desc: "All your health history in one secure place."
            }
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-[#BEBFC5] shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-[#A31621] font-bold text-xl">
                {f.title}
              </h4>
              <p className="text-gray-600 mt-2">
                {f.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-[#BEBFC5] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-[#A31621] mb-12">
            How it works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "Create your account",
              "Describe your symptoms or choose a doctor",
              "Get care instantly online"
            ].map((step, i) => (
              <div
                key={i}
                className="relative bg-[#FCF7F8] border border-[#BEBFC5] rounded-3xl p-6"
              >
                <div className="text-[#4E8098] font-bold text-sm">
                  Step {i + 1}
                </div>

                <h4 className="text-[#A31621] font-semibold text-lg mt-2">
                  {step}
                </h4>

                <div className="absolute top-4 right-4 text-[#BEBFC5] text-2xl font-bold">
                  {i + 1}
                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ROLE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-8 border border-[#BEBFC5] shadow-sm hover:shadow-md transition">
          <h4 className="text-[#A31621] text-2xl font-bold">
            For Patients
          </h4>
          <p className="text-gray-600 mt-3">
            Book consultations, receive prescriptions, and track your health journey in one place.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#BEBFC5] shadow-sm hover:shadow-md transition">
          <h4 className="text-[#A31621] text-2xl font-bold">
            For Doctors
          </h4>
          <p className="text-gray-600 mt-3">
            Manage availability, consultations, and patient records efficiently.
          </p>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-[#A31621] to-red-700 text-white py-24 text-center">

        <h3 className="text-4xl font-extrabold">
          Healthcare, reimagined.
        </h3>

        <p className="mt-4 text-white/80">
          Join a smarter, faster, more accessible healthcare system today.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-[#A31621] px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition shadow-lg"
        >
          Get Started
        </Link>

      </section>

    </div>
  );
};

export default Home;