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
    <div className="bg-[var(--bg)] rounded-lg border border-[var(--text20)] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Video Conference
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={joinMeeting}
            disabled={isJoined}
            className={`flex items-center px-3 py-2 text-sm rounded-md ${
              isJoined
                ? "bg-[var(--text60)] cursor-not-allowed"
                : "bg-[var(--primary)] text-[var(--primarycontrast)] active:bg-[var(--primary85)]"
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
                ? "bg-[var(--text60)] cursor-not-allowed"
                : "bg-[var(--error)] text-[var(--primarycontrast)] active:bg-[var(--error-text)]"
            }`}
          >
            <Video className="h-5 w-5 mr-2" />
            Leave Meeting
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="aspect-video bg-[var(--text10)] rounded-lg"
      />
    </div>
  );
};

export default VideoConference;
