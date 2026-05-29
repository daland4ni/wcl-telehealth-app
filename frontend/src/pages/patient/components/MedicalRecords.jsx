import { formatDate } from '../../../util/formatDate';

const MedicalRecords = ({
  medicalRecords,
}) => {

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h3 className="text-xl font-bold text-[#A31621] mb-4">
        Medical Records
      </h3>

      {medicalRecords.length > 0 ? (

        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

          {medicalRecords.map((record) => (

            <div
              key={record._id}
              className="border border-[#BEBFC5] rounded-2xl p-4 bg-[#FCF7F8]"
            >

              <div className="flex justify-between items-start mb-3">

                <div>

                  <h4 className="font-bold text-[#A31621]">
                    Dr. {record.doctor.name}
                  </h4>

                  <p className="text-sm text-[#4E8098]">
                    {record.doctor.specialization}
                  </p>

                </div>

                <span className="text-sm text-[#4E8098]">
                  {formatDate(record.createdAt)}
                </span>

              </div>

              <div className="mb-3">

                <p className="text-sm font-semibold text-[#A31621]">
                  Diagnosis
                </p>

                <p className="text-sm text-[#4E8098]">
                  {record.diagnosis}
                </p>

              </div>

              <div className="mb-3">

                <p className="text-sm font-semibold text-[#A31621]">
                  Prescription
                </p>

                <p className="text-sm text-[#4E8098] whitespace-pre-line">
                  {record.prescription}
                </p>

              </div>

              <div>

                <p className="text-sm font-semibold text-[#A31621]">
                  Consultation Notes
                </p>

                <p className="text-sm text-[#4E8098] whitespace-pre-line">
                  {record.consultationNotes}
                </p>

              </div>

            </div>
          ))}

        </div>

      ) : (

        <div className="border border-dashed border-[#BEBFC5] rounded-2xl p-5 text-center">

          <p className="text-[#4E8098] text-sm">
            No medical records yet.
          </p>

        </div>

      )}

    </section>
  );
};

export default MedicalRecords;