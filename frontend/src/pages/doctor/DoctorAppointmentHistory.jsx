import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

import { useAuth } from '../../contexts/AuthContext';

import {
  getDoctorAppointments,
} from '../../services/appointmentService';

import { formatDate } from '../../util/formatDate';

const DoctorAppointmentHistory =
  () => {

    const { user, logout } =
      useAuth();

    const [appointments,
      setAppointments] =
      useState([]);

    useEffect(() => {
      fetchAppointments();
    }, []);

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
                appointment.status ===
                  'completed' ||
                appointment.status ===
                  'cancelled'
            );

          setAppointments(
            filtered
          );

        } catch (error) {

          console.error(error);
        }
      };

    return (
      <div className="min-h-screen bg-[#FCF7F8]">

        <Navbar
          user={user}
          logout={logout}
        />

        <main className="max-w-6xl mx-auto p-6">

          <h1 className="text-4xl font-bold text-[#A31621] mb-8">
            Appointment History
          </h1>

          <div className="space-y-4">

            {appointments.length >
            0 ? (

              appointments.map(
                (appointment) => (

                  <div
                    key={appointment._id}
                    className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h2 className="text-xl font-bold text-[#A31621]">
                        {
                            appointment
                              .patient.name
                          }
                        </h2>

                      </div>

                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        appointment.status ===
                        'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {
                          appointment.status
                        }
                      </span>

                    </div>

                    <div className="mt-4 text-[#4E8098]">

                      <p>
                        {formatDate(
                          appointment.appointmentDate
                        )}
                      </p>

                      <p>
                        {
                          appointment.startTime
                        }
                        {' - '}
                        {
                          appointment.endTime
                        }
                      </p>

                    </div>

                  </div>
                )
              )

            ) : (

              <div className="bg-white rounded-3xl p-8 text-center border border-[#BEBFC5] text-[#4E8098]">

                No appointment history yet.

              </div>

            )}

          </div>

        </main>

      </div>
    );
  };

export default DoctorAppointmentHistory;