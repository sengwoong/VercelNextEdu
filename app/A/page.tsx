"use client";




import React, { useEffect, useState } from 'react';

interface VideoProps extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  srcObject?: MediaStream;
}

const App = () => {
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  useEffect(() => {
    getMedia();
    getCameras();
  }, []);

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameras(videoDevices);
    } catch (e) {
      console.log(e);
    }
  };

  const getMedia = async (deviceId?: string) => {
    const initialConstraints = {
      audio: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    } catch (e) {
      console.log(e);
    }
  };

  const handleMuteClick = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setMuted(!muted);
    }
  };

  const handleCameraClick = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setCameraOff(!cameraOff);
    }
  };

  

  const Video: React.FC<VideoProps> = ({ srcObject, ...props }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current && srcObject) {
        videoRef.current.srcObject = srcObject;
      }
    }, [srcObject]);

    return <video ref={videoRef} {...props} />;
  };

  return (
    <div>
      <header>
        <h1>Noom</h1>
      </header>
      <main>
        <div id="myStream">
          {myStream && (
            <Video id="myFace" autoPlay playsInline width="400" height="400" srcObject={myStream}></Video>
          )}
          <video id="sharedScreen" autoPlay playsInline width="400" height="400"></video>
          <button id="mute" onClick={handleMuteClick}>
            {muted ? 'Unmute' : 'Mute'}
          </button>

          <br></br>
          <button id="camera" onClick={handleCameraClick}>
            {cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
          </button>

       
        </div>
      </main>
    </div>
  );
};

export default App;
