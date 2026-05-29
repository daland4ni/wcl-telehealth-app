import { startConsultation } from '../../../services/appointmentService';
import { useState, useEffect, useRef } from 'react';

const AppointmentQueue = ({
  appointments,
  handleStartConsultation,
  handleViewRecords,

  handleSubmitConsultation,
  selectedAppointment,

  diagnosis,
  setDiagnosis,

  consultationNotes,
  setConsultationNotes,

  prescription,
  setPrescription,

  user,
}) => {

  const jitsiContainerRef = useRef(null);

  const [jitsiApi, setJitsiApi] =
    useState(null);

  useEffect(() => {

    const loadJitsiScript = () => {

      if (
        window.JitsiMeetExternalAPI
      ) {
        return;
      }

      const script =
        document.createElement(
          'script'
        );

      script.src =
        'https://meet.jit.si/external_api.js';

      script.async = true;

      document.body.appendChild(
        script
      );
    };

    loadJitsiScript();

  }, []);

  const [
    showConsultationModal,
    setShowConsultationModal,
  ] = useState(false);

  const [
    consultationRoom,
    setConsultationRoom,
  ] = useState('');

  const handleStartVideoCall =
    async (appointment) => {

      try {

        await startConsultation(
          appointment._id
        );

        setSelectedAppointment(
          appointment
        );

        setConsultationRoom(
          `Consultation-${appointment._id}`
        );

        setShowConsultationModal(
          true
        );

      } catch (error) {

        console.error(error);

        alert(
          'Failed to start consultation.'
        );
      }
    };

  const handleSaveConsultation =
    async () => {

      try {

        await handleSubmitConsultation(
          selectedAppointment
        );

        if (jitsiApi) {
          jitsiApi.dispose();
        }

        setShowConsultationModal(
          false
        );

        alert(
          'Consultation saved successfully.'
        );

      } catch (error) {

        console.error(error);

        alert(
          'Failed to save consultation.'
        );
      }
    };

  return (
    <section className="bg-white rounded-3xl p-6 shadow-md border border-[#BEBFC5]">

      <h2 className="text-2xl font-bold text-[#A31621] mb-6">
        Appointment Queue
      </h2>

      {appointments.length > 0 ? (
        <div className="space-y-4">

          {appointments.map((a) => (
            <div
              key={a._id}
              className="border border-[#BEBFC5] rounded-2xl p-5 flex justify-between bg-[#FCF7F8]"
            >

              <div>

                <p className="font-bold text-[#A31621]">
                  {a.patient.name}
                </p>

                <p className="text-sm text-[#4E8098]">
                  {a.patient.email}
                </p>

                <div className="mt-3 flex gap-2">

                  <button
                    onClick={() => handleViewRecords(a.patient._id)}
                    className="border border-[#4E8098] text-[#4E8098] px-4 py-2 rounded-xl font-semibold hover:bg-[#4E8098] hover:text-white transition"
                  >
                    Records
                  </button>

                  <button
                    onClick={() => {

                      handleStartConsultation(a);
                      setShowConsultationModal(
                        true
                      );

                      setTimeout(() => {

                        if (!window.JitsiMeetExternalAPI) {
                          alert(
                            'Jitsi failed to load.'
                          );

                          return;
                        }

                        const domain =
                          'meet.jit.si';

                        const roomName =
                          `Consultation-${a._id}-${Date.now()}`;

                        const api =
                          new window.JitsiMeetExternalAPI(
                            domain,
                            {
                              roomName,

                              parentNode:
                                jitsiContainerRef.current,

                              userInfo: {
                                displayName:
                                  `Dr. ${user.name}`,
                              },

                              configOverwrite: {
                                prejoinPageEnabled: false,

                                disableDeepLinking: true,

                                startWithAudioMuted: false,
                                startWithVideoMuted: false,

                                enableWelcomePage: false,

                                lobby: {
                                  autoKnock: false,
                                },

                                breakoutRooms: {
                                  hideAddRoomButton: true,
                                },
                              },

                              interfaceConfigOverwrite: {
                                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                                SHOW_JITSI_WATERMARK: false,
                              },
                            }
                          );

                        setJitsiApi(api);

                      }, 300);
                    }}
                    className="bg-[#A31621] text-white px-4 py-2 rounded-xl"
                  >
                    Start Video Call
                  </button>

                </div>

              </div>

              <div className="text-right text-sm text-[#4E8098]">
                {new Date(a.appointmentDate).toLocaleString()}
              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="text-center py-10 text-[#4E8098]">
          No appointments yet.
        </div>
      )}

      {showConsultationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

          <div className="bg-white rounded-3xl w-[90%] h-[90%] p-4 relative">

            <button
              onClick={() => {

                if (jitsiApi) {
                  jitsiApi.dispose();
                }

                setShowConsultationModal(
                  false
                );
              }}
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Close
            </button>

            <div className="flex gap-4 h-full pt-10">

              {/* LEFT SIDE - VIDEO */}
              <div className="flex-1 h-full">

                <div
                  ref={jitsiContainerRef}
                  className="w-full h-full rounded-2xl overflow-hidden border"
                />

              </div>

              {/* RIGHT SIDE - NOTES */}
              <div className="w-[400px] bg-[#FCF7F8] rounded-2xl p-5 overflow-y-auto border border-[#BEBFC5]">

                <h2 className="text-2xl font-bold text-[#A31621] mb-5">
                  Consultation Notes
                </h2>

                {/* DIAGNOSIS */}
                <div className="mb-4">

                  <label className="block text-sm font-semibold text-[#A31621] mb-2">
                    Diagnosis
                  </label>

                  <textarea
                    value={diagnosis}
                    onChange={(e) =>
                      setDiagnosis(e.target.value)
                    }
                    placeholder="Enter diagnosis..."
                    className="w-full border rounded-xl p-3 min-h-[100px]"
                  />

                </div>

                {/* NOTES */}
                <div className="mb-4">

                  <label className="block text-sm font-semibold text-[#A31621] mb-2">
                    Consultation Notes
                  </label>

                  <textarea
                    value={consultationNotes}
                    onChange={(e) =>
                      setConsultationNotes(
                        e.target.value
                      )
                    }
                    placeholder="Enter notes..."
                    className="w-full border rounded-xl p-3 min-h-[150px]"
                  />

                </div>

                {/* PRESCRIPTION */}
                <div className="mb-6">

                  <label className="block text-sm font-semibold text-[#A31621] mb-2">
                    Prescription
                  </label>

                  <textarea
                    value={prescription}
                    onChange={(e) =>
                      setPrescription(
                        e.target.value
                      )
                    }
                    placeholder="Enter prescription..."
                    className="w-full border rounded-xl p-3 min-h-[120px]"
                  />

                </div>

                {/* ACTIONS */}
                <button
                  onClick={handleSaveConsultation}
                  className="w-full bg-[#A31621] hover:bg-red-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  Save and End Consultation
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default AppointmentQueue;