import { formatDate } from '../../../util/formatDate';

const MultiSelectModal = ({
  show,
  setShow,
  selectedSlots,
  setSelectedSlots,
  handleCreateMultipleSlots,
}) => {
  if (!show) return null;

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const slots = [
    '7:00 AM - 8:00 AM',
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-6xl max-h-[90vh] overflow-auto">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#A31621]">
            Select Multiple Slots
          </h2>

          <button onClick={() => setShow(false)}>
            ✕
          </button>
        </div>

        <table className="w-full border-collapse">

          <thead>
            <tr>
              <th className="border p-3 bg-[#FCF7F8]">Time</th>

              {days.map((d) => (
                <th key={d} className="border p-3 bg-[#FCF7F8]">
                  {formatDate(d)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slots.map((slot) => (
              <tr key={slot}>
                <td className="border p-3 font-semibold">
                  {slot}
                </td>

                {days.map((date) => {
                  const key = `${date}_${slot}`;
                  const selected = selectedSlots.find(s => s.key === key);

                  return (
                    <td key={key} className="border p-3 text-center">

                      <button
                        onClick={() => {
                          const exists = selected;

                          if (exists) {
                            setSelectedSlots(
                              selectedSlots.filter(s => s.key !== key)
                            );
                          } else {
                            setSelectedSlots([
                              ...selectedSlots,
                              { key, date, slot }
                            ]);
                          }
                        }}
                        className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                          selected
                            ? 'bg-[#A31621] text-white'
                            : 'bg-[#FCF7F8] hover:bg-gray-200'
                        }`}
                      >
                        {slot}
                      </button>

                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreateMultipleSlots}
            className="bg-[#4E8098] text-white px-6 py-3 rounded-xl"
          >
            Save Slots
          </button>
        </div>

      </div>
    </div>
  );
};

export default MultiSelectModal;