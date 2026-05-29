const ConsultationModal = ({
  show,
  setShow,
  diagnosis,
  setDiagnosis,
  consultationNotes,
  setConsultationNotes,
  prescription,
  setPrescription,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-[#A31621] mb-6">
          Consultation Notes
        </h2>

        <textarea
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <textarea
          placeholder="Notes"
          value={consultationNotes}
          onChange={(e) => setConsultationNotes(e.target.value)}
          className="w-full border p-3 rounded-xl mb-3"
        />

        <textarea
          placeholder="Prescription"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShow(false)}
            className="flex-1 bg-gray-200 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 bg-[#A31621] text-white py-2 rounded-xl"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConsultationModal;