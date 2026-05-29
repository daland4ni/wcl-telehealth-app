import {
    useEffect,
    useRef,
} from 'react';

const VideoModal = ({
    roomName,
    userName,
    onClose,
}) => {

    const jitsiRef = useRef(null);

    useEffect(() => {

        const domain = '8x8.vc';

        const api =
            new window.JitsiMeetExternalAPI(
                domain,
                {
                    roomName,

                    parentNode:
                        jitsiRef.current,

                    userInfo: {
                        displayName:
                            userName,
                    },

                    configOverwrite: {
                        prejoinPageEnabled: false,

                        startWithAudioMuted: false,
                        startWithVideoMuted: false,

                        enableWelcomePage: false,

                        disableModeratorIndicator: true,

                        disablePolls: true,

                        enableLobbyChat: false,

                        lobbyModeEnabled: false,

                        securityUi: {
                            hideLobbyButton: true,
                        },
                    },

                    interfaceConfigOverwrite: {
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    },
                }
            );

        return () => api.dispose();

    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">

            <div className="bg-white w-[95%] h-[90%] rounded-3xl overflow-hidden relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-[#A31621] text-white px-4 py-2 rounded-xl"
                >
                    Leave Call
                </button>

                <div
                    ref={jitsiRef}
                    className="w-full h-full"
                />

            </div>

        </div>
    );
};

export default VideoModal;