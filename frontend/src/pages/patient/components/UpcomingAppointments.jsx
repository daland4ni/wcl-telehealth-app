import { Link } from 'react-router-dom';
import { formatDate } from '../../../util/formatDate';

const UpcomingAppointments = ({
  upcomingAppointments,
  handleReschedule,
  handleCancelAppointment,
}) => {
  return (
    <section className="mb-10">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-[#A31621]">
          Upcoming Appointments
        </h2>

        <Link
          to="/patient/history"
          className="text-[#4E8098] hover:underline text-sm font-semibold"
        >
          View Appointment History
        </Link>

      </div>

      {upcomingAppointments.length > 0 ? (

        <div className="space-y-4">

          {upcomingAppointments.map(
            (appointment) => (

              <div
                key={appointment._id}
                className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-xl font-bold text-[#A31621]">
                      Dr. {appointment.doctor.name}
                    </h3>

                    <p className="text-[#4E8098]">
                      {appointment.doctor.specialization}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${appointment.status ===
                        'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {appointment.status}
                  </span>

                </div>

                <div className="mt-4 text-[#4E8098]">

                  <p>
                    {formatDate(
                      appointment.appointmentDate
                    )}
                  </p>

                  <p>
                    {appointment.startTime}
                    {' - '}
                    {appointment.endTime}
                  </p>

                  {appointment.status !==
                    'cancelled' && (

                      <div className="flex gap-3 mt-5">

                        <Link
                          to={`/consultation/${appointment._id}`}
                          className="bg-[#A31621] text-white px-4 py-2 rounded-xl"
                        >
                          Join Consultation
                        </Link>

                        <button
                          onClick={() =>
                            handleReschedule(
                              appointment
                            )
                          }
                          className="bg-[#4E8098] hover:bg-[#3c6679] text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                          Reschedule
                        </button>

                        <button
                          onClick={() =>
                            handleCancelAppointment(
                              appointment._id
                            )
                          }
                          className="bg-[#A31621] hover:bg-red-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                        >
                          Cancel
                        </button>

                      </div>

                    )}

                </div>

              </div>
            )
          )}

        </div>

      ) : (

        <div className="bg-white rounded-3xl p-8 shadow-md border border-[#BEBFC5] text-center text-[#4E8098]">
          No upcoming appointments.
        </div>

      )}

    </section>
  );
};

export default UpcomingAppointments;