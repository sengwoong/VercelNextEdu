"use client";










import React, { useEffect, useRef, useState } from 'react';
// import JoinRoom from './ainput/page';



import { io } from 'socket.io-client';
import { redirect } from 'next/navigation';

const socket = io('http://localhost:3001');


  
interface VideoProps extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  srcObject?: MediaStream;
}

const App = () => {
  const [RoomNum, setRoomNum] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  useEffect(() => {
    if(RoomNum !== null){
      if(password === "1"){
  getMedia();
      }
    
    getCameras();}
  }, [RoomNum]);

function startMedia(){
  getCameras();
}

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



//아래는버튼

  const ShowVideo = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

    // setRoomNum 함수를 호출하여 값을 변경
    socket.emit('join-room', username, startMedia);
    console.log(username)
    setRoomNum(username);
    startMedia()

    // redirect 등의 로직 추가
  }




//위까지버튼



  return (
    <div>
      <header>
        <h1>Noom</h1>
      </header>
   
      <main>
        {!RoomNum && (
         //여기까리로그인

         <div className="flex justify-center items-center h-screen">
         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
               Username
             </label>
             <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="username"
               type="text"
               placeholder="Username"
               value={username}
               onChange={handleUsernameChange}
             />
           </div>
           
           {/* 비밀번호 입력 부분과 관련된 코드 추가 */}
           <div className="mb-4">
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
               Password
             </label>
             <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="password"
               type="password"
               placeholder="Password"
               value={password}
               onChange={handlePasswordChange}
             />
           </div>
   
           <div className="flex items-center justify-between">
             <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
             >
               Sign In
             </button>
           </div>
         </form>
       </div>


//여기까리로그인

        )}

        {RoomNum && (
          <div id="myStream">
            <div>{RoomNum + '에 입장'}</div>
          
            {myStream && (
              <Video id="myFace" autoPlay playsInline width="400" height="400" srcObject={myStream}></Video>
            )}
            <video id="sharedScreen" autoPlay playsInline width="400" height="400"></video>
            <button id="mute" onClick={handleMuteClick}>
              {muted ? 'Unmute' : 'Mute'}
            </button>
            <br />
            <button id="camera" onClick={handleCameraClick}>
              {cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
