import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { useDoctorDashboard } from '../../hooks/useDoctorDashboard';

import RecordsModal from './components/RecordsModal';
//import MultiSelectModal from './components/MultiSelectModal';
import AppointmentQueue from './components/AppointmentQueue';
import AvailabilityCalendar from './components/AvailabilityCalendar';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const d = useDoctorDashboard(user?._id, user?.isAvailable);

  const card =
    "bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]";

  const primaryText = "text-[#A31621]";
  const secondaryText = "text-[#4E8098]";



  return (
    <div className="min-h-screen bg-[#FCF7F8]">
      <Navbar user={user} logout={logout} />

      <main className="max-w-7xl mx-auto p-6 space-y-8">

        {/* OVERVIEW */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className={card}>
            <p className={`text-sm ${secondaryText}`}>Appointments</p>
            <p className={`text-3xl font-bold ${primaryText}`}>
              {d.appointments.length}
            </p>
          </div>

          <div className={card}>
            <p className={`text-sm ${secondaryText}`}>Patients</p>
            <p className={`text-3xl font-bold ${primaryText}`}>
              {d.appointments.length}
            </p>
          </div>

          <div className={card}>
            <p className={`text-sm ${secondaryText} mb-3`}>
              Availability
            </p>

            <button
              onClick={d.handleToggleAvailability}
              className={`px-5 py-2 rounded-full font-semibold text-white transition ${d.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}
            >
              {d.isAvailable ? 'Available' : 'Unavailable'}
            </button>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          <div className="w-full lg:w-1/2">
            <AvailabilityCalendar
              selectedSlots={d.selectedSlots}
              setSelectedSlots={d.setSelectedSlots}
              doctorId={user?._id}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <AppointmentQueue
              appointments={d.appointments}
              handleStartConsultation={d.handleStartConsultation}
              handleViewRecords={d.handleViewRecords}
              handleSubmitConsultation={d.handleSubmitConsultation}
              selectedAppointment={d.selectedAppointment}
              diagnosis={d.diagnosis}
              setDiagnosis={d.setDiagnosis}
              consultationNotes={d.consultationNotes}
              setConsultationNotes={d.setConsultationNotes}
              prescription={d.prescription}
              setPrescription={d.setPrescription}
              user={user}
            />
          </div>

        </div>

        {/* MODALS */}

        <RecordsModal
          show={d.showRecordsModal}
          setShow={d.setShowRecordsModal}
          records={d.selectedPatientRecords}
          patient={d.selectedPatient}
        />

      </main>
    </div>
  );
};

export default DoctorDashboard;