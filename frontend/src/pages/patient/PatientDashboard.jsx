import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { useEffect, useState } from 'react';

import specializations from '../../data/specializations';
import { getDoctors } from '../../services/doctorService';
import { createAppointment, } from '../../services/appointmentService';
import { getDoctorAvailability } from '../../services/availabilityService';

import { formatDate } from '../../util/formatDate';


import Navbar from '../components/Navbar';

const PatientDashboard = () => {

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [doctorSlots, setDoctorSlots] =
    useState([]);

  const [
    showAvailabilityModal,
    setShowAvailabilityModal,
  ] = useState(false);

  const [
    showConsentModal,
    setShowConsentModal,
  ] = useState(false);

  const [selectedSlot, setSelectedSlot] =
    useState(null);

  const [consentChecked, setConsentChecked] =
    useState(false);
  const { user, logout } = useAuth();

  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState('');

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialization]);

  const handleViewAvailability =
    async (doctor) => {
      try {
        const slots =
          await getDoctorAvailability(
            doctor._id
          );

        setSelectedDoctor(doctor);

        setDoctorSlots(slots);

        setShowAvailabilityModal(
          true
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleSelectSlot = (
    slot
  ) => {
    setSelectedSlot(slot);

    setShowAvailabilityModal(
      false
    );

    setShowConsentModal(true);
  };

  const handleConfirmBooking =
    async () => {
      try {
        if (!consentChecked) {
          alert(
            'You must consent before continuing.'
          );

          return;
        }

        await createAppointment({
          patient: user._id,
          doctor:
            selectedDoctor._id,
          slotId:
            selectedSlot._id,
          consentToShareRecords: true,
        });

        alert(
          'Appointment booked successfully!'
        );

        setShowConsentModal(false);

        setConsentChecked(false);

      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
          'Booking failed.'
        );
      }
    };


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

  const handleBookAppointment =
    async (doctorId) => {
      try {
        await createAppointment({
          patient: user._id,
          doctor: doctorId,
          appointmentDate:
            new Date(),
        });

        alert(
          'Appointment booked successfully!'
        );
      } catch (error) {
        console.error(error);

        alert('Booking failed');
      }
    };

  return (
    <div className="min-h-screen bg-[#FCF7F8]">
      {/* HEADER */}
      <Navbar user={user} logout={logout} />

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
              to="/doctors"
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
                  className={`px-4 py-2 rounded-full transition border ${selectedSpecialization === ''
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
                      className={`px-4 py-2 rounded-full transition border ${selectedSpecialization ===
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

                      <button
                        onClick={() =>
                          handleViewAvailability(
                            doctor
                          )
                        }
                        className="bg-[#A31621] hover:bg-red-800 text-white px-4 py-2 rounded-xl font-semibold transition"
                      >
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

        {/* AVAILABILITY MODAL */}
        {showAvailabilityModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

              <h2 className="text-2xl font-bold text-[#A31621] mb-6">
                Available Slots
              </h2>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">

                {doctorSlots.map((slot) => (
                  <button
                    key={slot._id}
                    disabled={slot.isBooked}
                    onClick={() =>
                      handleSelectSlot(slot)
                    }
                    className={`w-full border rounded-2xl p-4 text-left transition ${slot.isBooked
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:border-[#4E8098]'
                      }`}
                  >
                    <p className="font-semibold">
                      {formatDate(slot.date)}
                    </p>

                    <p>
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </button>
                ))}

              </div>

              <button
                onClick={() =>
                  setShowAvailabilityModal(
                    false
                  )
                }
                className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl"
              >
                Close
              </button>

            </div>
          </div>
        )}
        {/* CONSENT MODAL */}
        {showConsentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

              <h2 className="text-2xl font-bold text-[#A31621] mb-6">
                Consent Required
              </h2>

              <p className="text-[#4E8098] mb-6">
                By continuing, you consent to sharing your medical records with Dr. {selectedDoctor?.name} for consultation purposes.
              </p>

              <label className="flex items-start gap-3 mb-6">

                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) =>
                    setConsentChecked(
                      e.target.checked
                    )
                  }
                  className="mt-1"
                />

                <span>
                  I consent to sharing my medical records with this doctor.
                </span>

              </label>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    setShowConsentModal(
                      false
                    )
                  }
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleConfirmBooking
                  }
                  className="flex-1 bg-[#A31621] hover:bg-red-800 text-white py-3 rounded-xl font-semibold"
                >
                  Confirm Booking
                </button>

              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;