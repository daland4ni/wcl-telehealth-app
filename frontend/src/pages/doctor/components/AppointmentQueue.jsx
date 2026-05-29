const AppointmentQueue = ({
  appointments,
  handleStartConsultation,
  handleViewRecords,
}) => {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h2 className="text-2xl font-bold text-[#A31621] mb-6">
        Appointment Queue
      </h2>

      {appointments.length > 0 ? (
        <div className="space-y-4">

          {appointments.map((a) => (
            <div
              key={a._id}
              className="border border-[#BEBFC5] rounded-2xl p-5 flex justify-between bg-[#FCF7F8]"
            >

              <div>

                <p className="font-bold text-[#A31621]">
                  {a.patient.name}
                </p>

                <p className="text-sm text-[#4E8098]">
                  {a.patient.email}
                </p>

                <div className="mt-3 flex gap-2">

                  <button
                    onClick={() => handleStartConsultation(a)}
                    className="bg-[#4E8098] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#3d6a7d] transition"
                  >
                    Start
                  </button>

                  <button
                    onClick={() => handleViewRecords(a.patient._id)}
                    className="border border-[#4E8098] text-[#4E8098] px-4 py-2 rounded-xl font-semibold hover:bg-[#4E8098] hover:text-white transition"
                  >
                    Records
                  </button>

                </div>

              </div>

              <div className="text-right text-sm text-[#4E8098]">
                {new Date(a.appointmentDate).toLocaleString()}
              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="text-center py-10 text-[#4E8098]">
          No appointments yet.
        </div>
      )}

    </section>
  );
};

export default AppointmentQueue;