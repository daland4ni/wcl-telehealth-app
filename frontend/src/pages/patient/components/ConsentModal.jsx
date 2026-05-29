const ConsentModal = ({
  showConsentModal,
  setShowConsentModal,
  selectedDoctor,
  consentChecked,
  setConsentChecked,
  handleConfirmBooking,
}) => {

  if (!showConsentModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-[#A31621] mb-6">
          Consent Required
        </h2>

        <p className="text-[#4E8098] mb-6">
          By continuing, you consent to sharing your medical records with Dr. {selectedDoctor?.name} for consultation purposes.
        </p>

        <label className="flex items-start gap-3 mb-6">

          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) =>
              setConsentChecked(
                e.target.checked
              )
            }
            className="mt-1"
          />

          <span>
            I consent to sharing my medical records with this doctor.
          </span>

        </label>

        <div className="flex gap-4">

          <button
            onClick={() =>
              setShowConsentModal(false)
            }
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmBooking}
            className="flex-1 bg-[#A31621] hover:bg-red-800 text-white py-3 rounded-xl font-semibold"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConsentModal;