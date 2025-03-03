// frontend/src/components/VideoConference.jsx
import React, { useEffect, useRef } from "react";
import { Video } from "lucide-react";

const VideoConference = ({ groupId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: `StudyHive-${groupId}`,
      width: "100%",
      height: "100%",
      parentNode: containerRef.current,
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "desktop", "chat", "hangup"],
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      api.dispose();
    };
  }, [groupId]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Video Conference
        </h2>
        <Video className="h-5 w-5 text-indigo-600" />
      </div>
      <div ref={containerRef} className="aspect-video bg-gray-100 rounded-lg" />
    </div>
  );
};

export default VideoConference;
