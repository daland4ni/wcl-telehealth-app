const AIInsights = () => {

  const tips = [
    'Stay hydrated throughout the day.',
    'Aim for 7-8 hours of sleep nightly.',
    'Regular exercise improves heart health.',
  ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h3 className="text-xl font-bold text-[#A31621] mb-4">
        AI Health Insights
      </h3>

      <div className="space-y-4">

        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-[#FCF7F8] rounded-2xl p-4 border border-[#BEBFC5]"
          >

            <p className="text-sm text-[#4E8098]">
              {tip}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AIInsights;