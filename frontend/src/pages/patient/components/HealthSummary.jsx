const HealthSummary = ({
  consultations,
  prescriptions,
  medicalRecords,
}) => {

  const items = [
    {
      label: 'Consultations',
      value: consultations,
    },
    {
      label: 'Prescriptions',
      value: prescriptions,
    },
    {
      label: 'Medical Records',
      value: medicalRecords,
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h3 className="text-xl font-bold text-[#A31621] mb-5">
        Health Summary
      </h3>

      <div className="space-y-4">

        {items.map((item, index) => (
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
  );
};

export default HealthSummary;