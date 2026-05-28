import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { useEffect, useState } from 'react';

import specializations from '../../data/specializations';
import { getDoctors } from '../../services/doctorService';

const PatientDashboard = () => {
  const { user, logout } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState('');

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialization]);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors(
        selectedSpecialization
      );

      setDoctors(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF7F8]">
      {/* HEADER */}
      <header className="bg-white border-b border-[#BEBFC5] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#A31621]">
              TeleHealth Portal
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

      {/* MAIN */}
      <main className="max-w-7xl mx-auto p-6">
        {/* HERO */}
        <section className="bg-gradient-to-r from-[#4E8098] to-[#87CEFA] rounded-3xl p-8 text-white shadow-lg mb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-3">
              Your Health, Simplified.
            </h2>

            <p className="text-lg opacity-90 mb-6">
              Connect with trusted healthcare professionals,
              manage your records, and receive AI-powered
              wellness insights all in one place.
            </p>

            <Link
              to="/discover"
              className="inline-block bg-white text-[#4E8098] font-semibold px-6 py-3 rounded-2xl hover:scale-105 transition"
            >
              Find a Doctor
            </Link>
          </div>
        </section>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* DOCTOR DISCOVERY */}
            <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-[#A31621]">
                    Doctor Discovery
                  </h3>

                  <p className="text-[#4E8098] mt-1">
                    Browse doctors by specialization.
                  </p>
                </div>
              </div>

              {/* FILTER BUTTONS */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() =>
                    setSelectedSpecialization('')
                  }
                  className={`px-4 py-2 rounded-full transition border ${
                    selectedSpecialization === ''
                      ? 'bg-[#4E8098] text-white border-[#4E8098]'
                      : 'bg-[#FCF7F8] border-[#BEBFC5]'
                  }`}
                >
                  All
                </button>

                {specializations.map(
                  (specialization) => (
                    <button
                      key={specialization}
                      onClick={() =>
                        setSelectedSpecialization(
                          specialization
                        )
                      }
                      className={`px-4 py-2 rounded-full transition border ${
                        selectedSpecialization ===
                        specialization
                          ? 'bg-[#4E8098] text-white border-[#4E8098]'
                          : 'bg-[#FCF7F8] border-[#BEBFC5]'
                      }`}
                    >
                      {specialization}
                    </button>
                  )
                )}
              </div>

              {/* DOCTOR CARDS */}
              <div className="grid md:grid-cols-2 gap-4">
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="border border-[#BEBFC5] rounded-2xl p-5 hover:shadow-lg transition bg-[#FCF7F8]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-[#A31621]">
                            Dr. {doctor.name}
                          </h4>

                          <p className="text-[#4E8098]">
                            {doctor.specialization}
                          </p>
                        </div>

                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Available
                        </span>
                      </div>

                      <button className="w-full bg-[#4E8098] hover:bg-[#3d6a7d] text-white py-2 rounded-xl transition font-medium">
                        Book Appointment
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-[#4E8098]">
                    No doctors found.
                  </div>
                )}
              </div>
            </section>

            {/* UPCOMING APPOINTMENTS */}
            <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
              <div className="mb-5">
                <h3 className="text-2xl font-bold text-[#A31621]">
                  Upcoming Appointments
                </h3>

                <p className="text-[#4E8098] mt-1">
                  Your scheduled consultations will appear
                  here.
                </p>
              </div>

              <div className="border border-dashed border-[#BEBFC5] rounded-2xl p-6 text-center">
                <p className="text-[#4E8098]">
                  No upcoming appointments yet.
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* HEALTH SUMMARY */}
            <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
              <h3 className="text-xl font-bold text-[#A31621] mb-5">
                Health Summary
              </h3>

              <div className="space-y-4">
                {[
                  {
                    label: 'Consultations',
                    value: '0',
                  },
                  {
                    label: 'Prescriptions',
                    value: '0',
                  },
                  {
                    label: 'Medical Records',
                    value: '0',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#FCF7F8] rounded-2xl px-4 py-3"
                  >
                    <span className="text-[#4E8098]">
                      {item.label}
                    </span>

                    <span className="font-bold text-[#A31621]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI INSIGHTS */}
            <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
              <h3 className="text-xl font-bold text-[#A31621] mb-4">
                AI Health Insights
              </h3>

              <div className="space-y-4">
                {[
                  'Stay hydrated throughout the day.',
                  'Aim for 7-8 hours of sleep nightly.',
                  'Regular exercise improves heart health.',
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="bg-[#FCF7F8] rounded-2xl p-4 border border-[#BEBFC5]"
                  >
                    <p className="text-sm text-[#4E8098]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* MEDICAL RECORDS */}
            <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
              <h3 className="text-xl font-bold text-[#A31621] mb-4">
                Medical Records
              </h3>

              <div className="border border-dashed border-[#BEBFC5] rounded-2xl p-5 text-center">
                <p className="text-[#4E8098] text-sm">
                  No records uploaded yet.
                </p>
              </div>
            </section>

            {/* EMERGENCY */}
            <section className="bg-[#A31621] rounded-3xl p-6 text-white shadow-md">
              <h3 className="text-xl font-bold mb-3">
                Emergency Assistance
              </h3>

              <p className="text-sm opacity-90 mb-5">
                Contact emergency services immediately for
                urgent medical situations.
              </p>

              <button className="w-full bg-white text-[#A31621] font-semibold py-3 rounded-2xl hover:scale-105 transition">
                View Emergency Contacts
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;