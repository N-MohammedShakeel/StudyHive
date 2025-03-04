// frontend/src/components/VideoConference.jsx
import React, { useState, useEffect, useRef } from "react";
import { Video } from "lucide-react";

const VideoConference = ({ groupId }) => {
  const containerRef = useRef(null);
  const [api, setApi] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const joinMeeting = () => {
    if (api) return;
    const domain = "meet.jit.si";
    const options = {
      roomName: `StudyHive-${groupId}`,
      width: "100%",
      height: "100%",
      parentNode: containerRef.current,
      userInfo: { displayName: `User-${Math.floor(Math.random() * 1000)}` },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: ["microphone", "camera", "desktop", "chat", "hangup"],
      },
    };
    const jitsiApi = new window.JitsiMeetExternalAPI(domain, options);
    setApi(jitsiApi);
    setIsJoined(true);
  };

  const leaveMeeting = () => {
    if (api) {
      api.dispose();
      setApi(null);
      setIsJoined(false);
    }
  };

  useEffect(() => {
    return () => {
      if (api) api.dispose();
    };
  }, [api]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Video Conference
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={joinMeeting}
            disabled={isJoined}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              isJoined
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <Video className="h-5 w-5 mr-2" />
            Join Meeting
          </button>
          <button
            onClick={leaveMeeting}
            disabled={!isJoined}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              !isJoined
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <Video className="h-5 w-5 mr-2" />
            Leave Meeting
          </button>
        </div>
      </div>
      <div ref={containerRef} className="aspect-video bg-gray-100 rounded-lg" />
    </div>
  );
};

export default VideoConference;
