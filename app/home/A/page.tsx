"use client";

// 너무 길어서 벨로그에 참조
// 화상 강의 페이지입니다.

import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const VideoCall: React.FC = () => {
  const ScreenShareRef = useRef<Socket | null>(null);
  const FirstVideosRef = useRef<HTMLVideoElement>(null);
  const SecundVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const roomName = 400;

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (FirstVideosRef.current) {
        FirstVideosRef.current.srcObject = stream;
      }

      if (!(pcRef.current && ScreenShareRef.current)) {
        return;
      }

      stream.getTracks().forEach((track) => {
        if (pcRef.current) {
          pcRef.current.addTrack(track, stream);
        }
      });

      if (pcRef.current) {
        pcRef.current.onicecandidate = (e) => {
          if (e.candidate && ScreenShareRef.current) {
            ScreenShareRef.current.emit("candidate", e.candidate, roomName);
          }
        };

        pcRef.current.ontrack = (e) => {
          if (SecundVideoRef.current) {
            SecundVideoRef.current.srcObject = e.streams[0];
          }
        };
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    if (!(pcRef.current && ScreenShareRef.current)) {
      return;
    }

    try {
      if (pcRef.current) {
        const sdp = await pcRef.current.createOffer();
        pcRef.current.setLocalDescription(sdp);
        if (ScreenShareRef.current) {
          ScreenShareRef.current.emit("offer", sdp, roomName);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(pcRef.current && ScreenShareRef.current)) {
      return;
    }

    try {
      if (pcRef.current) {
        pcRef.current.setRemoteDescription(sdp);
        const answerSdp = await pcRef.current.createAnswer();
        pcRef.current.setLocalDescription(answerSdp);
        if (ScreenShareRef.current) {
          ScreenShareRef.current.emit("answer", answerSdp, roomName);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartCall = () => {
    setIsWaiting(true);
    createOffer();
  };

  useEffect(() => {
    const initializeRTC = async () => {
      pcRef.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

      ScreenShareRef.current = io("localhost:8080");

      if (ScreenShareRef.current) {
        ScreenShareRef.current.on(
          "all_users",
          (allUsers: { length: number }) => {
            if (allUsers.length > 0) {
              setIsWaiting(false);
            }
          }
        );

        ScreenShareRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
          createAnswer(sdp);
        });

        ScreenShareRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
          if (pcRef.current) {
            pcRef.current.setRemoteDescription(sdp);
          }
        });

        ScreenShareRef.current.on(
          "getCandidate",
          async (candidate: RTCIceCandidate) => {
            if (pcRef.current) {
              await pcRef.current.addIceCandidate(candidate);
            }
          }
        );

        ScreenShareRef.current.emit("join_room", {
          room: roomName,
        });
      }
    };

    const cleanupRTC = () => {
      if (ScreenShareRef.current) {
        ScreenShareRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };

    initializeRTC();
    getMedia();

    return cleanupRTC;
  }, []);

  return (
    <div>
      <div>
        {!isWaiting ? (
          <button onClick={handleStartCall}>Start Call</button>
        ) : (
          <p>Waiting for another user to join...</p>
        )}
      </div>
      <div className="text-center">나의화면</div>
      <video
        id="myvideo"
        className="h-2/5 w-2/5 m-auto border-2 border-violet-500"
        ref={FirstVideosRef}
        autoPlay
      />
      <div className=" text-center">미러링</div>
      <video
        id="remotevideo"
        className="h-2/5 w-2/5 m-auto border-2 border-violet-500"
        ref={SecundVideoRef}
        autoPlay
      />
    </div>
  );
};

export default VideoCall;
