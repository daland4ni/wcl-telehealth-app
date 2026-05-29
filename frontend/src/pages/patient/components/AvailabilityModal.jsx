import { formatDate } from '../../../util/formatDate';

const AvailabilityModal = ({
  showAvailabilityModal,
  setShowAvailabilityModal,
  doctorSlots,
  handleSelectSlot,
}) => {

  if (!showAvailabilityModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-[#A31621] mb-6">
          Available Slots
        </h2>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">

          {doctorSlots.length > 0 ? (

            doctorSlots.map((slot) => (
              <button
                key={slot._id}
                disabled={slot.isBooked}
                onClick={() =>
                  handleSelectSlot(slot)
                }
                className={`w-full border rounded-2xl p-4 text-left transition ${
                  slot.isBooked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'hover:border-[#4E8098]'
                }`}
              >

                <p className="font-semibold">
                  {formatDate(slot.date)}
                </p>

                <p>
                  {slot.startTime} - {slot.endTime}
                </p>

              </button>
            ))

          ) : (

            <div className="text-center py-10">

              <p className="text-[#4E8098] text-lg font-medium">
                No more available slots.
              </p>

              <p className="text-gray-400 text-sm mt-2">
                This doctor currently has no open schedules.
              </p>

            </div>

          )}

        </div>

        <button
          onClick={() =>
            setShowAvailabilityModal(false)
          }
          className="mt-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default AvailabilityModal;