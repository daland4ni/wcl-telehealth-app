import specializations from '../../../data/specializations';

const DoctorDiscovery = ({
  doctors,
  selectedSpecialization,
  setSelectedSpecialization,
  handleViewAvailability,
}) => {
  return (
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

      {/* FILTERS */}
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

      {/* DOCTORS */}
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
  );
};

export default DoctorDiscovery;