import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../util/formatDate';
import { createMedicalRecord, getPatientRecords } from '../../services/medicalRecordService';
import { getDoctorAppointments, toggleAvailability, } from '../../services/appointmentService';
import { createAvailability, } from '../../services/availabilityService';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] =
    useState([]);

  const [isAvailable, setIsAvailable] =
    useState(user?.isAvailable);

  const [selectedDate, setSelectedDate] =
    useState('');

  const [selectedTimeSlot, setSelectedTimeSlot,]
    = useState('');

  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [selectedPatientRecords, setSelectedPatientRecords] = useState([]);

  const [
    showConsultationModal,
    setShowConsultationModal,
  ] = useState(false);

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState(null);

  const [diagnosis, setDiagnosis] =
    useState('');

  const [
    consultationNotes,
    setConsultationNotes,
  ] = useState('');

  const [
    prescription,
    setPrescription,
  ] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  // FETCH APPOINTMENTS
  const fetchAppointments =
    async () => {
      try {
        const data =
          await getDoctorAppointments(
            user._id
          );

        const filtered =
          data.filter(
            (appointment) =>
              appointment.status !==
              'completed' &&
              appointment.status !==
              'cancelled'
          );

        setAppointments(filtered);
      } catch (error) {
        console.error(error);
      }
    };

  // TOGGLE AVAILABILITY
  const handleToggleAvailability =
    async () => {
      try {
        const data =
          await toggleAvailability(
            user._id
          );

        setIsAvailable(
          data.isAvailable
        );
      } catch (error) {
        console.error(error);
      }
    };

  // GENERATE NEXT 7 DAYS
  const generateNext7Days = () => {
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(
        date.getDate() + i
      );

      dates.push(
        date
          .toISOString()
          .split('T')[0]
      );
    }

    return dates;
  };

  // FORMAT HOURS
  const formatHour = (hour) => {
    const suffix =
      hour >= 12 ? 'PM' : 'AM';

    const formatted =
      hour % 12 === 0
        ? 12
        : hour % 12;

    return `${formatted}:00 ${suffix}`;
  };

  // GENERATE TIME SLOTS
  const generateTimeSlots = (
    targetDate
  ) => {

    const slots = [];

    const now = new Date();

    const today =
      new Date()
        .toISOString()
        .split('T')[0];

    const isToday =
      targetDate === today;

    // IF TODAY IS PAST 5PM
    if (
      isToday &&
      now.getHours() >= 18
    ) {
      return [];
    }

    for (
      let hour = 7;
      hour < 18;
      hour++
    ) {

      // REMOVE PAST HOURS FOR TODAY
      if (
        isToday &&
        hour <= now.getHours()
      ) {
        continue;
      }

      const startHour = hour;

      const endHour = hour + 1;

      const formattedStart =
        formatHour(startHour);

      const formattedEnd =
        formatHour(endHour);

      slots.push(
        `${formattedStart} - ${formattedEnd}`
      );
    }

    return slots;
  };

  // CREATE SLOT
  const handleCreateSlot =
    async () => {
      try {
        if (
          !selectedDate ||
          !selectedTimeSlot
        ) {
          alert(
            'Please complete all fields.'
          );

          return;
        }

        const split =
          selectedTimeSlot.split(
            ' - '
          );

        const startTime = split[0];

        const endTime = split[1];

        await createAvailability({
          doctor: user._id,
          date: selectedDate,
          startTime,
          endTime,
        });

        alert(
          'Availability slot created!'
        );

        setSelectedDate('');

        setSelectedTimeSlot('');
      } catch (error) {
        console.error(error);

        alert(
          'Failed to create slot.'
        );
      }
    };

  const [
    showMultiSelectModal,
    setShowMultiSelectModal,
  ] = useState(false);

  const [
    selectedSlots,
    setSelectedSlots,
  ] = useState([]);

  const toggleSlotSelection = (
    date,
    slot
  ) => {

    const key = `${date}_${slot}`;

    const exists =
      selectedSlots.find(
        (item) => item.key === key
      );

    if (exists) {
      setSelectedSlots(
        selectedSlots.filter(
          (item) =>
            item.key !== key
        )
      );
    } else {
      setSelectedSlots([
        ...selectedSlots,
        {
          key,
          date,
          slot,
        },
      ]);
    }
  };

  const handleCreateMultipleSlots =
    async () => {
      try {

        for (const item of selectedSlots) {

          const split =
            item.slot.split(' - ');

          await createAvailability({
            doctor: user._id,

            date: item.date,

            startTime: split[0],

            endTime: split[1],
          });
        }

        alert(
          'Multiple slots created!'
        );

        setSelectedSlots([]);

        setShowMultiSelectModal(
          false
        );

      } catch (error) {
        console.error(error);

        alert(
          'Failed to create slots.'
        );
      }
    };

  const handleStartConsultation =
    (appointment) => {

      setSelectedAppointment(
        appointment
      );

      setShowConsultationModal(
        true
      );
    };


  const handleSubmitConsultation =
    async () => {

      try {

        await createMedicalRecord({
          appointmentId:
            selectedAppointment._id,

          diagnosis,

          consultationNotes,

          prescription,
        });

        alert(
          'Medical record created successfully!'
        );

        setShowConsultationModal(
          false
        );

        setDiagnosis('');

        setConsultationNotes('');

        setPrescription('');

        setSelectedAppointment(
          null
        );

        fetchAppointments();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data
            ?.message ||
          'Failed to create medical record.'
        );
      }
    };

  const handleViewRecords =
    async (patientId) => {

      try {

        const data =
          await getPatientRecords(
            patientId
          );

        setSelectedPatientRecords(
          data
        );

        setShowRecordsModal(true);

      } catch (error) {

        console.error(error);

        alert(
          'Failed to fetch records.'
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#FCF7F8]">
      <Navbar
        user={user}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto p-6">

        {/* OVERVIEW */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          {/* APPOINTMENTS */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
            <h3 className="text-[#4E8098] text-sm mb-2">
              Appointments
            </h3>

            <p className="text-3xl font-bold text-[#A31621]">
              {appointments.length}
            </p>
          </div>

          {/* PATIENTS */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
            <h3 className="text-[#4E8098] text-sm mb-2">
              Patients
            </h3>

            <p className="text-3xl font-bold text-[#A31621]">
              {appointments.length}
            </p>
          </div>

          {/* AVAILABILITY */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">
            <h3 className="text-[#4E8098] text-sm mb-4">
              Availability
            </h3>

            <div className="flex items-center gap-4">

              <button
                onClick={
                  handleToggleAvailability
                }
                className={`relative w-16 h-8 rounded-full transition ${isAvailable
                  ? 'bg-green-500'
                  : 'bg-gray-400'
                  }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${isAvailable
                    ? 'left-9'
                    : 'left-1'
                    }`}
                />
              </button>

              <span
                className={`font-semibold ${isAvailable
                  ? 'text-green-600'
                  : 'text-red-600'
                  }`}
              >
                {isAvailable
                  ? 'Available'
                  : 'Unavailable'}
              </span>

            </div>
          </div>
        </div>

        {/* CREATE AVAILABILITY SLOT */}
        <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5] mb-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-[#A31621]">
              Create Availability Slot
            </h2>

            {/* FUTURE FEATURE BUTTON */}
            <button
              onClick={() =>
                setShowMultiSelectModal(
                  true
                )
              }
              className="border border-[#4E8098] text-[#4E8098] hover:bg-[#4E8098] hover:text-white transition px-4 py-2 rounded-xl font-semibold"
            >
              Select Multiple
            </button>


          </div>

          <div className="grid md:grid-cols-3 gap-4">

            {/* DATE DROPDOWN */}
            <select
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
              className="border border-[#BEBFC5] rounded-xl p-3"
            >
              <option value="">
                Select Date
              </option>

              {generateNext7Days().map(
                (date) => (
                  <option
                    key={date}
                    value={date}
                  >
                    {formatDate(date)}
                  </option>
                )
              )}
            </select>

            {/* TIME SLOT DROPDOWN */}
            <select
              value={
                selectedTimeSlot
              }
              onChange={(e) =>
                setSelectedTimeSlot(
                  e.target.value
                )
              }
              className="border border-[#BEBFC5] rounded-xl p-3"
              disabled={!selectedDate || generateTimeSlots(selectedDate).length === 0}
            >
              <option value="">
                {generateTimeSlots(selectedDate).length === 0 ? 'No more slots for today' : 'Select Time Slot'}
              </option>

              {generateTimeSlots().map(
                (slot) => (
                  <option
                    key={slot}
                    value={slot}
                  >
                    {slot}
                  </option>
                )
              )}
            </select>

            {/* BUTTON */}
            <button
              onClick={
                handleCreateSlot
              }
              className="bg-[#4E8098] hover:bg-[#3d6a7d] text-white rounded-xl font-semibold"
            >
              Add Slot
            </button>

          </div>
        </section>

        {/* APPOINTMENT QUEUE */}
        <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

          <h2 className="text-2xl font-bold text-[#A31621] mb-6">
            Appointment Queue
          </h2>
          <Link
            to="/doctor/history"
            className="text-[#4E8098] hover:underline text-sm font-semibold"
          >
            View Appointment History
          </Link>

          {appointments.length >
            0 ? (
            <div className="space-y-4">

              {appointments.map(
                (appointment) => (
                  <div
                    key={
                      appointment._id
                    }
                    className="border border-[#BEBFC5] rounded-2xl p-5 flex items-center justify-between"
                  >

                    <div>
                      <h3 className="font-bold text-[#A31621]">
                        {
                          appointment
                            .patient.name
                        }
                      </h3>

                      <p className="text-[#4E8098]">
                        {
                          appointment
                            .patient.email
                        }
                      </p>
                      {appointment.status !==
                        'completed' && appointment.status !== 'cancelled' && (
                          <div>
                            <button
                              onClick={() =>
                                handleStartConsultation(
                                  appointment
                                )
                              }
                              className="mt-4 bg-[#4E8098] hover:bg-[#3c6679] text-white px-4 py-2 rounded-xl font-semibold transition"
                            >
                              Start Consultation
                            </button>
                            <button
                              onClick={() =>
                                handleViewRecords(
                                  appointment.patient._id
                                )
                              }
                              className="mt-2 ml-3 bg-[#FCF7F8] border border-[#4E8098] hover:bg-[#4E8098] hover:text-white text-[#4E8098] px-4 py-2 rounded-xl font-semibold transition"
                            >
                              View Records
                            </button>
                          </div>
                        )}
                    </div>

                    <div className="text-right">

                      <p className="text-sm text-[#4E8098]">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleString()}
                      </p>

                      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {
                          appointment.status
                        }
                      </span>

                    </div>

                  </div>
                )
              )}

            </div>
          ) : (
            <div className="text-center py-10 text-[#4E8098]">
              No appointments yet.
            </div>
          )}
        </section>
        {showMultiSelectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-6xl max-h-[90vh] overflow-auto">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-[#A31621]">
                  Select Multiple Slots
                </h2>

                <button
                  onClick={() =>
                    setShowMultiSelectModal(
                      false
                    )
                  }
                  className="text-gray-500"
                >
                  ✕
                </button>

              </div>

              <div className="overflow-auto">

                <table className="w-full border-collapse">

                  <thead>

                    <tr>

                      <th className="border p-3 bg-[#FCF7F8]">
                        Time
                      </th>

                      {generateNext7Days().map(
                        (date) => (
                          <th
                            key={date}
                            className="border p-3 bg-[#FCF7F8]"
                          >
                            {formatDate(date)}
                          </th>
                        )
                      )}

                    </tr>

                  </thead>

                  <tbody>

                    {[
                      '7:00 AM - 8:00 AM',
                      '8:00 AM - 9:00 AM',
                      '9:00 AM - 10:00 AM',
                      '10:00 AM - 11:00 AM',
                      '11:00 AM - 12:00 PM',
                      '12:00 PM - 1:00 PM',
                      '1:00 PM - 2:00 PM',
                      '2:00 PM - 3:00 PM',
                      '3:00 PM - 4:00 PM',
                      '4:00 PM - 5:00 PM',
                      '5:00 PM - 6:00 PM',
                    ].map(
                      (slot) => (
                        <tr key={slot}>

                          <td className="border p-3 font-semibold">
                            {slot}
                          </td>

                          {generateNext7Days().map(
                            (date) => {

                              const key = `${date}_${slot}`;

                              const selected =
                                selectedSlots.find(
                                  (item) =>
                                    item.key === key
                                );

                              const availableSlots = generateTimeSlots(date);
                              const isAvailable = availableSlots.includes(slot);

                              return (
                                <td
                                  key={key}
                                  className="border p-3 text-center"
                                >
                                  {isAvailable ? (
                                    <button
                                      onClick={() =>
                                        toggleSlotSelection(
                                          date,
                                          slot
                                        )
                                      }
                                      className={`px-3 py-2 rounded-xl text-sm font-semibold transition ${selected
                                        ? 'bg-[#A31621] text-white'
                                        : 'bg-[#FCF7F8] hover:bg-[#BEBFC5]'
                                        }`}
                                    >
                                      {slot}
                                    </button>) : (
                                    <div className="text-gray-300 text-sm"> — </div>
                                  )}

                                </td>
                              );
                            }
                          )}

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

              <div className="flex justify-end mt-6">

                <button
                  onClick={
                    handleCreateMultipleSlots
                  }
                  className="bg-[#4E8098] hover:bg-[#3d6a7d] text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Add Selected Slots
                </button>

              </div>

            </div>
          </div>
        )}


        {/* CONSULTATION MODAL */}
        {showConsultationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              <h2 className="text-3xl font-bold text-[#A31621] mb-6">
                Consultation Notes
              </h2>

              <div className="space-y-6">

                {/* DIAGNOSIS */}
                <div>

                  <label className="block font-semibold mb-2 text-[#A31621]">
                    Diagnosis
                  </label>

                  <textarea
                    value={diagnosis}
                    onChange={(e) =>
                      setDiagnosis(
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full border border-[#BEBFC5] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
                    placeholder="Enter diagnosis..."
                  />

                </div>

                {/* NOTES */}
                <div>

                  <label className="block font-semibold mb-2 text-[#A31621]">
                    Consultation Notes
                  </label>

                  <textarea
                    value={
                      consultationNotes
                    }
                    onChange={(e) =>
                      setConsultationNotes(
                        e.target.value
                      )
                    }
                    rows={6}
                    className="w-full border border-[#BEBFC5] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
                    placeholder="Enter consultation notes..."
                  />

                </div>

                {/* PRESCRIPTION */}
                <div>

                  <label className="block font-semibold mb-2 text-[#A31621]">
                    Prescription
                  </label>

                  <textarea
                    value={prescription}
                    onChange={(e) =>
                      setPrescription(
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full border border-[#BEBFC5] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
                    placeholder="Enter prescription..."
                  />

                </div>

              </div>

              <div className="flex gap-4 mt-8">

                <button
                  onClick={() =>
                    setShowConsultationModal(
                      false
                    )
                  }
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-2xl font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleSubmitConsultation
                  }
                  className="flex-1 bg-[#A31621] hover:bg-red-800 text-white py-3 rounded-2xl font-semibold"
                >
                  Save Medical Record
                </button>

              </div>

            </div>

          </div>
        )}
        {/* VIEW RECORDS MODAL */}
        {showRecordsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-3xl font-bold text-[#A31621]">
                  Patient Medical Records
                </h2>

                <button
                  onClick={() =>
                    setShowRecordsModal(
                      false
                    )
                  }
                  className="text-gray-500 text-xl"
                >
                  ✕
                </button>

              </div>

              {selectedPatientRecords.length >
                0 ? (

                <div className="space-y-5">

                  {selectedPatientRecords.map(
                    (record) => (

                      <div
                        key={record._id}
                        className="border border-[#BEBFC5] rounded-2xl p-5 bg-[#FCF7F8]"
                      >

                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-4">

                          <div>

                            <h3 className="text-xl font-bold text-[#A31621]">
                              Dr. {
                                record.doctor
                                  ?.name ||
                                'Unknown Doctor'
                              }
                            </h3>

                            <p className="text-[#4E8098]">
                              {
                                record.doctor
                                  ?.specialization
                              }
                            </p>

                          </div>

                          <span className="text-sm text-[#4E8098]">
                            {formatDate(
                              record.createdAt
                            )}
                          </span>

                        </div>

                        {/* DIAGNOSIS */}
                        <div className="mb-4">

                          <h4 className="font-semibold text-[#A31621] mb-1">
                            Diagnosis
                          </h4>

                          <p className="text-[#4E8098]">
                            {
                              record.diagnosis ||
                              'No diagnosis'
                            }
                          </p>

                        </div>

                        {/* PRESCRIPTION */}
                        <div className="mb-4">

                          <h4 className="font-semibold text-[#A31621] mb-1">
                            Prescription
                          </h4>

                          <p className="text-[#4E8098] whitespace-pre-line">
                            {
                              record.prescription ||
                              'No prescription'
                            }
                          </p>

                        </div>

                        {/* NOTES */}
                        <div>

                          <h4 className="font-semibold text-[#A31621] mb-1">
                            Consultation Notes
                          </h4>

                          <p className="text-[#4E8098] whitespace-pre-line">
                            {
                              record.consultationNotes ||
                              'No notes'
                            }
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <div className="text-center py-10 text-[#4E8098]">

                  No medical records found.

                </div>

              )}

            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;