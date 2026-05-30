import { formatDate } from '../../../util/formatDate';


const RecordsModal = ({
  show,
  setShow,
  records,
  patient,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-auto">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#A31621]">
            Patient Records
          </h2>

          <button onClick={() => setShow(false)}>
            ✕
          </button>
        </div>

        <h3 className="text-lg font-bold text-[#A31621] mb-2">
          Basic Medical History
        </h3>

        <p className="text-[#4E8098] whitespace-pre-wrap mb-4">
          {patient?.medicalHistory?.trim()
            ? patient.medicalHistory
            : 'No medical history provided.'}
        </p>

        <h3 className="text-lg font-bold text-[#A31621] mb-2">
          Past Appointments and Notes
        </h3>

        {records.length > 0 ? (
          records.map((r) => (
            <div key={r._id} className="border p-4 rounded-xl mb-4">

              <p className="font-bold">
                Dr. {r.doctor?.name}
              </p>

              <p className="text-sm text-gray-500">
                {r.diagnosis}
              </p>

              <p className="text-sm">
                {r.prescription}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {formatDate(r.createdAt)}
              </p>

            </div>
          ))
        ) : (
          <p className="text-gray-500">No records found.</p>
        )}

      </div>
    </div>
  );
};

export default RecordsModal;