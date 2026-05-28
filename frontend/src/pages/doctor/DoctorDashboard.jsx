import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import { useAuth } from '../../contexts/AuthContext';
import { formatDate } from '../../util/formatDate';

import {
  getDoctorAppointments,
  toggleAvailability,
} from '../../services/appointmentService';

import {
  createAvailability,
} from '../../services/availabilityService';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();

  const [appointments, setAppointments] =
    useState([]);

  const [isAvailable, setIsAvailable] =
    useState(user?.isAvailable);

  const [selectedDate, setSelectedDate] =
    useState('');

  const [
    selectedTimeSlot,
    setSelectedTimeSlot,
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

        setAppointments(data);
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
                                  </button> ) : (
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
      </main>
    </div>
  );
};

export default DoctorDashboard;