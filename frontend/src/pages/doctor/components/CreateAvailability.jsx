const CreateAvailability = ({
  selectedDate,
  setSelectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  handleCreateSlot,
  setShowMultiSelectModal,
  formatDate,
}) => {
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const timeSlots = [
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
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5] mb-8">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-[#A31621]">
          Create Availability Slot
        </h2>

        <button
          onClick={() => setShowMultiSelectModal(true)}
          className="border border-[#4E8098] text-[#4E8098] px-4 py-2 rounded-xl font-semibold hover:bg-[#4E8098] hover:text-white transition"
        >
          Select Multiple
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        {/* DATE */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-[#BEBFC5] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
        >
          <option value="">Select Date</option>

          {dates.map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>

        {/* TIME */}
        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          className="border border-[#BEBFC5] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
          disabled={!selectedDate}
        >
          <option value="">Select Time Slot</option>

          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {/* BUTTON */}
        <button
          onClick={handleCreateSlot}
          className="bg-[#4E8098] hover:bg-[#3d6a7d] text-white rounded-xl font-semibold transition"
        >
          Add Slot
        </button>

      </div>

    </section>
  );
};

export default CreateAvailability;