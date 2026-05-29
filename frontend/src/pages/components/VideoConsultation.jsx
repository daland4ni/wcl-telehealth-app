import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';

const VideoConsultation = () => {

    const { appointmentId } = useParams();

    return (
        <div className="w-full h-screen bg-black">
            <JitsiMeeting
                domain="meet.jit.si"
                roomName={`consultation-${appointmentId}`}
                configOverwrite={{
                    startWithAudioMuted: false,
                    startWithVideoMuted: false,
                    prejoinPageEnabled: false,
                    enableLobbyChat: false,
                    lobbyModeEnabled: false,
                }}
                interfaceConfigOverwrite={{
                    SHOW_JITSI_WATERMARK: false,
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '100vh';
                    iframeRef.style.width = '100%';
                }}
            />
        </div>
    );
};


export default VideoConsultation;