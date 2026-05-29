import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FCF7F8]">

      {/* NAVBAR (simple version for landing) */}
      <div className="flex items-center justify-between px-8 py-6">

        <h1 className="text-2xl font-bold text-[#A31621]">
          VitaCare
        </h1>

        <div className="flex gap-4 items-center justify-center">
          <Link
            to="/login"
            className="text-[#4E8098] font-semibold hover:underline"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#4E8098] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#3d6a7d] transition"
          >
            Get Started
          </Link>
        </div>

      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h2 className="text-5xl font-bold text-[#A31621] leading-tight">
            Healthcare,
            <br />
            without the waiting room.
          </h2>

          <p className="mt-6 text-[#4E8098] text-lg">
            Connect instantly with licensed doctors, manage your medical records,
            and get care from anywhere — all in one secure platform.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/register"
              className="bg-[#A31621] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-800 transition"
            >
              Start as Patient
            </Link>

            <Link
              to="/register"
              className="border border-[#4E8098] text-[#4E8098] px-6 py-3 rounded-2xl font-semibold hover:bg-[#4E8098] hover:text-white transition"
            >
              Join as Doctor
            </Link>

          </div>

        </div>

        {/* HERO IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-[#BEBFC5]">

          <img
            src="/images/patient_laptop.jpg"
            alt="Doctor consultation"
            className="w-full h-full object-cover"
          />

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-8 py-16">

        <h3 className="text-3xl font-bold text-[#A31621] mb-10">
          Why patients choose us
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Instant Appointments",
              desc: "Book consultations with available doctors in seconds."
            },
            {
              title: "Secure Medical Records",
              desc: "Your health data is encrypted and always accessible."
            },
            {
              title: "AI Health Insights",
              desc: "Get intelligent summaries of your health trends."
            }
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]"
            >
              <h4 className="text-[#A31621] font-bold text-xl">
                {f.title}
              </h4>
              <p className="text-[#4E8098] mt-2">
                {f.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white border-y border-[#BEBFC5] py-16">

        <div className="max-w-7xl mx-auto px-8">

          <h3 className="text-3xl font-bold text-[#A31621] mb-10">
            How it works
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Create an account",
              "Book a doctor",
              "Get treated online"
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 border border-[#BEBFC5]"
              >
                <p className="text-[#4E8098] font-bold">
                  Step {i + 1}
                </p>
                <h4 className="text-[#A31621] font-semibold text-lg mt-2">
                  {step}
                </h4>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* DOCTOR / PATIENT SPLIT */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-8 shadow-md border border-[#BEBFC5]">
          <h4 className="text-[#A31621] text-2xl font-bold">
            For Patients
          </h4>
          <p className="text-[#4E8098] mt-3">
            Book consultations, view prescriptions, and track your health history.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-[#BEBFC5]">
          <h4 className="text-[#A31621] text-2xl font-bold">
            For Doctors
          </h4>
          <p className="text-[#4E8098] mt-3">
            Manage appointments, create medical records, and handle availability.
          </p>
        </div>

      </section>

      {/* FINAL CTA */}
      <section className="bg-[#A31621] text-white py-20 text-center">

        <h3 className="text-4xl font-bold">
          Start your telehealth journey today
        </h3>

        <p className="mt-4 opacity-90">
          Join patients and doctors building a smarter healthcare system.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-[#A31621] px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>

      </section>

    </div>
  );
};

export default Home;