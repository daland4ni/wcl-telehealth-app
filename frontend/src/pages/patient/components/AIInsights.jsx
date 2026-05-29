import { useState } from "react";
import { getSpecialistRecommendation }
  from '../../../services/aiService';

const AIInsights = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {

    setError('');

    setResult(null);

    if (!symptoms.trim()) {

      setError(
        'Please describe your symptoms.'
      );

      return;
    }

    try {

      setLoading(true);

      const data =
        await getSpecialistRecommendation(
          symptoms
        );

      setResult(data);

    } catch (err) {

      console.error(err);

      setError(
        'Failed to get recommendation.'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h3 className="text-xl font-bold text-[#A31621] mb-2">
        AI Health Assistant
      </h3>

      <p className="text-[#4E8098] text-sm mb-4">
        Describe your symptoms and we’ll suggest the right specialist.
      </p>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g. chest pain when breathing, dizziness..."
        className="w-full border border-[#BEBFC5] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4E8098]"
        rows={4}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-[#4E8098] hover:bg-[#3d6a7d] text-white px-5 py-2 rounded-xl font-semibold"
      >
        {loading ? "Analyzing..." : "Get Recommendation"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FCF7F8] border border-[#BEBFC5]">

          <h4 className="text-lg font-bold text-[#A31621]">
            {result.specialization}
          </h4>

          <p className="text-[#4E8098] mt-1">
            {result.reason}
          </p>

          <p className="mt-2 text-sm font-semibold">
            Urgency: {result.urgency}
          </p>

        </div>
      )}

    </section>
  );
};

export default AIInsights;