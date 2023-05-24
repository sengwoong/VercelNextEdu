"use client"

import { useRef, useEffect } from 'react';
import io from 'socket.io-client';



const socket = io('https://b6ea-220-68-8-39.ngrok-free.app/remote-ctrl');


function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null); //
  const rtcPeerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" }
      ], 
      
     
    

    })
  );

  const handleStream = (stream: MediaStream) => {
    console.log(stream,"stream")
    console.log("연결까지감")
    stream.getTracks().forEach((track) => {
      rtcPeerConnection.current.addTrack(track, stream);
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => videoRef.current?.play();
    }
    console.log("연결까지감됌")
  };

  const getStream = async (selectedScreen: { id: string | null}) => {

    if (selectedScreen==null){
      return alert("화면을 선택해주세요")
    }
    console.log("getStream");
    try {
      console.log(selectedScreen);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectedScreen.id,
          },
        } as MediaTrackConstraints, // 타입을 MediaTrackConstraints로 지정
      });
  
      handleStream(stream);
    } catch (e) {
      console.log('Error accessing media devices:', e);
    }
  };
  




  

  useEffect(() => {
    ((window as any).electronAPI &&
    (window as any).electronAPI.getScreenId((event:any, screenId:any) => {
      
        

        console.log('Renderer...', screenId);
        console.log('Renderer...', screenId);

        getStream(screenId);
      })) ||
      getStream({ id:null });




    socket.on('offer', (offerSDP) => {
      console.log('Received offer');
      rtcPeerConnection.current
        .setRemoteDescription(new RTCSessionDescription(offerSDP))
        .then(() => {
          rtcPeerConnection.current.createAnswer().then((sdp) => {
            rtcPeerConnection.current.setLocalDescription(sdp);

            console.log('Sending answer');
            socket.emit('answer', sdp);
          });
        });
    });

    socket.on('answer', (answerSDP) => {
      console.log('Received answer');
      rtcPeerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answerSDP)
      );
    });

    socket.on('icecandidate', (icecandidate) => {
      rtcPeerConnection.current.addIceCandidate(
        new RTCIceCandidate(icecandidate)
      );
    });

    rtcPeerConnection.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('icecandidate', e.candidate);
        console.log('Sent icecandidate');
      }
    };

    rtcPeerConnection.current.oniceconnectionstatechange = (e) => {
      console.log('ICE connection state change:', e);
    };

    rtcPeerConnection.current.ontrack = (e) => {
      if (videoRef.current) {
        videoRef.current.srcObject = e.streams[0];
        videoRef.current.onloadedmetadata = () => videoRef.current?.play();
      }

      console.log('Received track:', e.streams[0]);
    };
  }, []);

 
  return (
    <div className="App">
      <div
        style={{
          display: 'block',
          backgroundColor: 'black',
          margin: 0,
        }}
      >
       
        <video ref={videoRef} className="video">
          video not available
        </video>
      </div>
    </div>
  );
}

export default App;
