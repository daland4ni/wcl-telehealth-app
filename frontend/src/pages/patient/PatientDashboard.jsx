import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import Navbar from '../components/Navbar';

import DoctorDiscovery from './components/DoctorDiscovery';
import UpcomingAppointments from './components/UpcomingAppointments';
import HealthSummary from './components/HealthSummary';
import AIInsights from './components/AIInsights';
import MedicalRecords from './components/MedicalRecords';

import AvailabilityModal from './components/AvailabilityModal';
import ConsentModal from './components/ConsentModal';

import { usePatientDashboard } from '../../hooks/usePatientDashboard';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const dashboard = usePatientDashboard(
    user?._id,
    selectedSpecialization
  );

  return (
    <div className="min-h-screen bg-[#FCF7F8]">
      {/* NAVBAR */}
      <Navbar user={user} logout={logout} />

      {/* MAIN */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">

        {/* HERO */}
        <section className="bg-gradient-to-r from-[#4E8098] to-[#87CEFA] rounded-3xl p-8 text-white shadow-lg">
          <h2 className="text-4xl font-bold mb-2">
            Your Health, Simplified.
          </h2>

          <p className="opacity-90 mb-6">
            Manage appointments, records, and insights in one place.
          </p>

          <Link
            to="/doctors"
            className="inline-block bg-white text-[#4E8098] px-6 py-3 rounded-2xl font-semibold"
          >
            Find a Doctor
          </Link>
        </section>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <DoctorDiscovery
              doctors={dashboard.doctors}
              selectedSpecialization={selectedSpecialization}
              setSelectedSpecialization={setSelectedSpecialization}
              handleViewAvailability={dashboard.handleViewAvailability}
            />

            <UpcomingAppointments
              upcomingAppointments={dashboard.upcomingAppointments}
              handleReschedule={dashboard.handleReschedule}
              handleCancelAppointment={dashboard.handleCancelAppointment}
            />

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            { /* 
            <HealthSummary
              consultations={dashboard.medicalRecords.length}
              prescriptions={dashboard.medicalRecords.length}
              medicalRecords={dashboard.medicalRecords.length}
            />
            */}

            <AIInsights setSelectedSpecialization={setSelectedSpecialization} />

            <MedicalRecords
              medicalRecords={dashboard.medicalRecords}
            />

            {/* EMERGENCY */}
            <section className="bg-[#A31621] rounded-3xl p-6 text-white shadow-md">
              <h3 className="text-xl font-bold mb-2">
                Emergency Assistance
              </h3>

              <p className="text-sm opacity-90 mb-4">
                Contact emergency services for urgent medical situations.
              </p>

              <button className="w-full bg-white text-[#A31621] font-semibold py-3 rounded-2xl">
                View Emergency Contacts
              </button>
            </section>

          </div>
        </div>

        {/* MODALS */}
        <AvailabilityModal
          showAvailabilityModal={dashboard.showAvailabilityModal}
          setShowAvailabilityModal={dashboard.setShowAvailabilityModal}
          doctorSlots={dashboard.doctorSlots}
          handleSelectSlot={dashboard.handleSelectSlot}
        />

        <ConsentModal
          showConsentModal={dashboard.showConsentModal}
          setShowConsentModal={dashboard.setShowConsentModal}
          selectedDoctor={dashboard.selectedDoctor}
          consentChecked={dashboard.consentChecked}
          setConsentChecked={dashboard.setConsentChecked}
          handleConfirmBooking={dashboard.handleConfirmBooking}
        />

      </main>
    </div>
  );
};

export default PatientDashboard;