// import React, { useEffect, useRef, useState  } from 'react';
// import Peer from 'peerjs';
// import { useNavigate } from 'react-router-dom';


// const generateMeetingCode = () => {
//   const characters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < 9; i++) {
//     if (i > 0 && i % 3 === 0) {
//       result += '-';
//     }
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

// const TEST = () => {
//   const [peerId, setPeerId] = useState('');
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [peers, setPeers] = useState([]);
//   const currentUserVideoRef = useRef(null);
//   const peerInstance = useRef(null);
//   const videoRefs = useRef({});

//   useEffect(() => {
    

//     const peer = new Peer(generateMeetingCode());//id 

//     peer.on('open', (id) => {
//       setPeerId(id);
//     });

//     peer.on('call', (call) => {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((mediaStream) => {
//           // Set the local video stream
//           currentUserVideoRef.current.srcObject = mediaStream;
//           currentUserVideoRef.current.play();

//           // Answer the call with the local media stream
//           call.answer(mediaStream);

//           // Handle the remote stream
//           call.on('stream', (remoteStream) => {
//             setPeers((prevPeers) => [
//               ...prevPeers,
//               { peerId: call.peer, stream: remoteStream },
//             ]);
//           });
//         })
//         .catch((error) => {
//           console.error('Error accessing media devices.', error);
//         });
//     });

//     peer.on('connection', (conn) => {
//       conn.on('data', (data) => {
//         setChat((prevChat) => [...prevChat, { sender: 'remote', message: data }]);
//       });
//     });

//     peerInstance.current = peer;
//   }, []);

//   useEffect(() => {
//     // Set the video streams to the video elements
//     peers.forEach((peer) => {
//       const videoElement = videoRefs.current[peer.peerId];
//       if (videoElement) {
//         videoElement.srcObject = peer.stream;
//       }
//     });
//   }, [peers]);

//   const call = (remotePeerId) => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         // Setting the local video stream
//         currentUserVideoRef.current.srcObject = mediaStream;
//         currentUserVideoRef.current.play();

//         // Making the call to the remote peer
//         const call = peerInstance.current.call(remotePeerId, mediaStream);

//         // Handling the remote stream
//         call.on('stream', (remoteStream) => {
//           setPeers((prevPeers) => [
//             ...prevPeers,
//             { peerId: remotePeerId, stream: remoteStream },
//           ]);
//         });

//         // Creating a data connection for chat
//         const conn = peerInstance.current.connect(remotePeerId);
//         conn.on('data', (data) => {
//           setChat((prevChat) => [...prevChat, { sender: 'remote', message: data }]);
//         });
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices.', error);
//       });
//   };

//   const sendMessage = () => {
//     if (message) {
//       peers.forEach((peer) => {
//         const conn = peerInstance.current.connect(peer.peerId);
//         conn.send(message);
//       });
//       setChat((prevChat) => [...prevChat, { sender: 'self', message }]);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Current user id is {peerId}</h1>
//       <input
//         type="text"
//         value={remotePeerIdValue}
//         onChange={e => setRemotePeerIdValue(e.target.value)}
//         placeholder="Enter remote peer ID"
//       />
//       <button onClick={() => call(remotePeerIdValue)}>Call</button>
//       <div>
//         <video ref={currentUserVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
//         {peers.map((peer, index) => (
//           <video
//             key={index}
//             ref={el => videoRefs.current[peer.peerId] = el}
//             autoPlay
//             style={{ width: '300px', height: '200px', border: '1px solid black' }}
//           />
//         ))}
//       </div>
    
     
//     </div>
//   );
// }

// export default TEST;  

/*********************************working */

// import React, { useState, useEffect, useRef } from 'react';
// import Peer from 'peerjs';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

// const generateMeetingCode = () => {
//   const characters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < 9; i++) {
//     if (i > 0 && i % 3 === 0) {
//       result += '-';
//     }
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

// const VideoConference = () => {
//   const [participants, setParticipants] = useState([]);
//   const [mainParticipant, setMainParticipant] = useState(null);
//   const [streams, setStreams] = useState({});
//   const [peerId, setPeerId] = useState('');
//   const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
//   const localStreamRef = useRef(null);
//   const peerInstance = useRef(null);
//   const videoRefs = useRef({});

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((mediaStream) => {
//         localStreamRef.current.srcObject = mediaStream;
//         localStreamRef.current.play();
//         setStreams(prevStreams => ({ ...prevStreams, local: mediaStream }));

//         const peer = new Peer(generateMeetingCode());
//         peer.on('open', (id) => {
//           setPeerId(id);
//           setParticipants(prevParticipants => [...prevParticipants, { id, name: 'You', micOn: true, videoOn: true }]);
//         });

//         peer.on('call', (call) => {
//           call.answer(mediaStream);
//           call.on('stream', (remoteStream) => {
//             setParticipants((prevParticipants) => [
//               ...prevParticipants,
//               { id: call.peer, name: `Peer ${call.peer}`, micOn: true, videoOn: true }
//             ]);
//             setStreams((prevStreams) => ({ ...prevStreams, [call.peer]: remoteStream }));
//           });
//         });

//         peer.on('connection', (conn) => {
//           conn.on('data', (data) => {
//             console.log('Message from remote:', data);
//           });
//         });

//         peerInstance.current = peer;
//       })
//       .catch((error) => console.error('Error accessing media devices.', error));
//   }, []);

//   useEffect(() => {
//     participants.forEach((participant) => {
//       const videoElement = videoRefs.current[participant.id];
//       if (videoElement && streams[participant.id]) {
//         videoElement.srcObject = streams[participant.id];
//       }
//     });
//   }, [participants, streams]);

//   const call = (remotePeerId) => {
//     const mediaStream = streams.local;
//     if (mediaStream) {
//       const call = peerInstance.current.call(remotePeerId, mediaStream);
//       call.on('stream', (remoteStream) => {
//         setParticipants((prevParticipants) => [
//           ...prevParticipants,
//           { id: remotePeerId, name: `Peer ${remotePeerId}`, micOn: true, videoOn: true }
//         ]);
//         setStreams((prevStreams) => ({ ...prevStreams, [remotePeerId]: remoteStream }));
//       });

//       const conn = peerInstance.current.connect(remotePeerId);
//       conn.on('data', (data) => {
//         console.log('Message from remote:', data);
//       });
//     }
//   };

//   const toggleMic = (id) => {
//     const participant = participants.find(p => p.id === id);
//     if (participant) {
//       setParticipants(participants.map(p => p.id === id ? { ...p, micOn: !p.micOn } : p));
//       const audioTrack = streams.local.getAudioTracks()[0];
//       audioTrack.enabled = !participant.micOn;
//     }
//   };

//   const toggleVideo = (id) => {
//     const participant = participants.find(p => p.id === id);
//     if (participant) {
//       setParticipants(participants.map(p => p.id === id ? { ...p, videoOn: !p.videoOn } : p));
//       const videoTrack = streams.local.getVideoTracks()[0];
//       videoTrack.enabled = !participant.videoOn;
//     }
//   };

//   const handleMainVideoChange = (participant) => {
//     setMainParticipant(participant);
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-900">
//       <div className="flex flex-grow overflow-hidden relative">
//         {/* Main Video Section */}
//         <div className="absolute inset-0">
//           <video
//             className="object-cover w-full h-full"
//             ref={localStreamRef}
//             autoPlay
//             muted={!participants.find(p => p.id === peerId)?.micOn}
//           />
//           <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//             {peerId}
//           </div>
//           {mainParticipant && streams[mainParticipant.id] && (
//             <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gray-800 border border-yellow-400">
//               <video
//                 className="object-cover w-full h-full"
//                 ref={el => videoRefs.current[mainParticipant.id] = el}
//                 autoPlay
//                 muted={!mainParticipant.micOn}
//               />
//             </div>
//           )}
//         </div>

//         {/* Side Videos Section */}
//         <div className="absolute bottom-0 left-0 w-full h-1/4 bg-transparent flex overflow-x-auto">
//           {participants
//             .filter((p) => p.id !== mainParticipant?.id && p.id !== peerId)
//             .map((participant) => (
//               <div
//                 key={participant.id}
//                 className="w-1/4 h-full flex-shrink-0 border border-blue-400"
//                 onClick={() => handleMainVideoChange(participant)}
//               >
//                 <video
//                   ref={el => videoRefs.current[participant.id] = el}
//                   className="object-cover w-full h-full"
//                   autoPlay
//                   muted={!participant.micOn}
//                 />
//                 <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                   {participant.id}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="p-4 flex justify-center bg-gray-800">
//         <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => toggleMic(peerId)}>
//           {participants.find(p => p.id === peerId)?.micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
//         </button>
//         <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => toggleVideo(peerId)}>
//           {participants.find(p => p.id === peerId)?.videoOn ? <FaVideo /> : <FaVideoSlash />}
//         </button>
//         <input
//           className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
//           type="text"
//           value={remotePeerIdValue}
//           onChange={e => setRemotePeerIdValue(e.target.value)}
//           placeholder="Remote Peer ID"
//         />
//         <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => call(remotePeerIdValue)}>Call</button>
//         <button className="bg-red-600 text-white px-4 py-2 mx-2 rounded">Leave</button>
//       </div>
//     </div>
//   );
// };

// export default VideoConference;


/*************************try */
import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaClipboard, FaClipboardCheck, FaDesktop, FaPhoneSlash, FaDownload } from 'react-icons/fa';
import { saveAs } from 'file-saver'; // Import file-saver for downloading files
import { Document, Packer, Paragraph, TextRun } from 'docx'; // Import docx for generating Word documents

const generateMeetingCode = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      result += '-';
    }
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const VideoConference = () => {
  const [participants, setParticipants] = useState([]);
  const [mainParticipant, setMainParticipant] = useState(null);
  const [streams, setStreams] = useState({});
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [showRoomIdModal, setShowRoomIdModal] = useState(false);
  const [roomIdCopied, setRoomIdCopied] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Track if the microphone is muted
  const [spaceBarHeld, setSpaceBarHeld] = useState(false); // State for space bar holding
  const [fileToSend, setFileToSend] = useState(null); // File to be sent
  const [receivedFiles, setReceivedFiles] = useState([]); // List of received files
  const [newParticipant, setNewParticipant] = useState(null); // Track new participant for timer
  const [timer, setTimer] = useState(null); // Timer for new participants
  const [attendance, setAttendance] = useState({}); // Track attendance
  const localStreamRef = useRef(null);
  const mainStreamRef = useRef(null);
  const minimizedStreamRef = useRef(null);
  const peerInstance = useRef(null);
  const videoRefs = useRef({});
  const calls = useRef({});
  const dataChannels = useRef({}); // Data channels for file transfer

  useEffect(() => {
    const initPeer = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current.srcObject = mediaStream;
        localStreamRef.current.play();
        setStreams(prevStreams => ({ ...prevStreams, local: mediaStream }));

        const peer = new Peer(generateMeetingCode());
        peer.on('open', (id) => {
          setPeerId(id);
          setParticipants(prevParticipants => [...prevParticipants, { id, name: 'You', micOn: true, videoOn: true }]);
        });

        peer.on('call', (call) => {
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            const newParticipant = { id: call.peer, name: `Peer ${call.peer}`, micOn: true, videoOn: true };
            setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
            setStreams(prevStreams => ({ ...prevStreams, [call.peer]: remoteStream }));

            // Start timer for new participant
            setNewParticipant(newParticipant);
            startTimer(call.peer);
          });
          calls.current[call.peer] = call;
        });

        peer.on('connection', (conn) => {
          conn.on('data', (data) => {
            if (data.file) {
              handleFileReceived(data.file, conn);
            } else {
              console.log('Message from remote:', data);
            }
          });
          dataChannels.current[conn.peer] = conn;
        });

        peerInstance.current = peer;
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    initPeer();
  }, []);

  useEffect(() => {
    participants.forEach((participant) => {
      const videoElement = videoRefs.current[participant.id];
      if (videoElement && streams[participant.id]) {
        videoElement.srcObject = streams[participant.id];
      }
    });
  }, [participants, streams]);

  const call = (remotePeerId) => {
    const mediaStream = streams.local;
    if (mediaStream) {
      const call = peerInstance.current.call(remotePeerId, mediaStream);
      call.on('stream', (remoteStream) => {
        const newParticipant = { id: remotePeerId, name: `Peer ${remotePeerId}`, micOn: true, videoOn: true };
        setParticipants(prevParticipants => [...prevParticipants, newParticipant]);
        setStreams(prevStreams => ({ ...prevStreams, [remotePeerId]: remoteStream }));

        // Start timer for new participant
        setNewParticipant(newParticipant);
        startTimer(remotePeerId);
      });
      calls.current[remotePeerId] = call;

      const conn = peerInstance.current.connect(remotePeerId);
      conn.on('data', (data) => {
        console.log('Message from remote:', data);
      });

      dataChannels.current[remotePeerId] = conn;
    }
  };

  const toggleMic = (id) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      const newMicState = !participant.micOn;
      setParticipants(participants.map(p => p.id === id ? { ...p, micOn: newMicState } : p));
      const audioTrack = streams.local.getAudioTracks()[0];
      audioTrack.enabled = newMicState;
      setIsMuted(!newMicState); // Update local mute state
    }
  };

  const toggleVideo = (id) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      const newVideoState = !participant.videoOn;
      setParticipants(participants.map(p => p.id === id ? { ...p, videoOn: newVideoState } : p));
      const videoTrack = streams.local.getVideoTracks()[0];
      videoTrack.enabled = newVideoState;
    }
  };

  const handleMainVideoChange = (participant) => {
    if (participant.id === peerId) {
      setMainParticipant(null);
    } else {
      setMainParticipant(participant);
    }
  };

  const copyRoomIdToClipboard = () => {
    navigator.clipboard.writeText(peerId)
      .then(() => {
        setRoomIdCopied(true);
        setTimeout(() => setRoomIdCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const toggleRoomIdModal = () => {
    setShowRoomIdModal(prevState => !prevState);
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const screenVideoTrack = screenStream.getVideoTracks()[0];

      // Replace local video track with screen share track
      const localMediaStream = streams.local;
      const localVideoTrack = localMediaStream.getVideoTracks()[0];
      localVideoTrack.stop();
      localMediaStream.removeTrack(localVideoTrack);
      localMediaStream.addTrack(screenVideoTrack);
      setStreams(prevStreams => ({ ...prevStreams, local: localMediaStream }));

      // Update all peer connections with new screen share track
      Object.values(calls.current).forEach(call => {
        const videoSender = call.peerConnection.getSenders().find(sender => sender.track.kind === 'video');
        if (videoSender) {
          videoSender.replaceTrack(screenVideoTrack);
        }
      });

      setIsScreenSharing(true);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const stopScreenShare = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoTrack = mediaStream.getVideoTracks()[0];

      // Replace screen share video track with the regular video track
      const localMediaStream = streams.local;
      const screenVideoTrack = localMediaStream.getVideoTracks().find(track => track.kind === 'video' && track !== videoTrack);
      screenVideoTrack.stop();
      localMediaStream.removeTrack(screenVideoTrack);
      localMediaStream.addTrack(videoTrack);
      setStreams(prevStreams => ({ ...prevStreams, local: localMediaStream }));

      // Update all peer connections with the regular video track
      Object.values(calls.current).forEach(call => {
        const videoSender = call.peerConnection.getSenders().find(sender => sender.track.kind === 'video');
        if (videoSender) {
          videoSender.replaceTrack(videoTrack);
        }
      });

      setIsScreenSharing(false);
    } catch (error) {
      console.error('Error stopping screen share:', error);
    }
  };

  const hangUp = () => {
    if (isScreenSharing) {
      stopScreenShare();
    }
    Object.values(calls.current).forEach(call => call.close());
    peerInstance.current.destroy();
    setParticipants([]);
    setStreams({});
    generateAttendanceReport();
  };

  const toggleCamera = () => {
    const videoTrack = streams.local.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      setFileToSend(file);
    } else {
      alert('File size exceeds 5 MB.');
    }
  };

  const sendFile = () => {
    if (fileToSend) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = {
          file: {
            name: fileToSend.name,
            size: fileToSend.size,
            type: fileToSend.type,
            data: reader.result
          }
        };
        Object.values(dataChannels.current).forEach(channel => {
          channel.send(data);
        });
        setFileToSend(null);
      };
      reader.readAsArrayBuffer(fileToSend);
    }
  };

  const handleFileReceived = (fileData, conn) => {
    const { name, size, type, data } = fileData;
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);

    setReceivedFiles((prevFiles) => [
      ...prevFiles,
      { name, size, type, url }
    ]);
  };

  const handleFileDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const startTimer = (peerId) => {
    const countdown = 30; // 30 seconds
    let timeLeft = countdown;

    setTimer(setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(timer);
        setTimer(null);
        setAttendance(prevAttendance => ({ ...prevAttendance, [peerId]: 'Present' }));
        alert(`Attendance registered for user ${peerId}`);
      }
    }, 1000));
  };

  const generateAttendanceReport = async () => {
    const doc = new Document();
    doc.addSection({
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('Attendance Report'),
            new TextRun({
              text: `Date: ${new Date().toLocaleDateString()}`,
              break: 1,
            }),
          ],
        }),
        ...Object.entries(attendance).map(([userId, status]) => 
          new Paragraph({
            children: [
              new TextRun(`${userId}: ${status}`),
              new TextRun({
                text: '\n',
              }),
            ],
          })
        ),
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    saveAs(new Blob([buffer]), 'attendance-report.docx');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey) {
        if (event.code === 'KeyM') {
          toggleMic(peerId);
        } else if (event.code === 'KeyC') {
          toggleCamera();
        } else if (event.code === 'KeyS') {
          isScreenSharing ? stopScreenShare() : startScreenShare();
        }
      } else if (event.code === 'Space') {
        setSpaceBarHeld(true);
        // Temporarily unmute while space bar is held
        if (streams.local.getAudioTracks()[0].enabled) {
          toggleMic(peerId);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setSpaceBarHeld(false);
        // Re-mute when space bar is released
        if (streams.local.getAudioTracks()[0].enabled) {
          toggleMic(peerId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [peerId, isScreenSharing, participants, streams]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Room ID Modal */}
      {showRoomIdModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-black p-4 rounded shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Room ID</h2>
            <div className="flex items-center mb-4">
              <span className="text-xl font-medium">{peerId}</span>
              <button
                className="ml-4 px-2 py-1 bg-gray-800 text-white rounded flex items-center"
                onClick={copyRoomIdToClipboard}
              >
                {roomIdCopied ? <FaClipboardCheck className="mr-2" /> : <FaClipboard className="mr-2" />}
                {roomIdCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded" onClick={toggleRoomIdModal}>Close</button>
          </div>
        </div>
      )}

      {/* File Sharing Section */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 p-2 text-white bg-gray-700 rounded"
        />
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={sendFile}
        >
          Send File
        </button>
        <div className="mt-4">
          {receivedFiles.map((file, index) => (
            <div key={index} className="mb-2">
              <span className="text-white">{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              <button
                className="ml-2 bg-gray-700 text-white px-2 py-1 rounded"
                onClick={() => handleFileDownload(file.url, file.name)}
              >
                <FaDownload />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Video Section */}
      <div className="relative flex-grow bg-gray-800 flex items-center justify-center">
        <video
          className="object-cover w-full h-full cursor-pointer"
          ref={mainParticipant ? minimizedStreamRef : localStreamRef}
          autoPlay
          muted
          onClick={() => handleMainVideoChange(peerId)}
        />
        {mainParticipant && (
          <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gray-800 border border-yellow-400">
            <video
              className="object-cover w-full h-full cursor-pointer"
              ref={mainStreamRef}
              autoPlay
              muted={!mainParticipant.micOn}
              onClick={() => handleMainVideoChange(mainParticipant)}
            />
          </div>
        )}
      </div>

      {/* Side Videos Section */}
      <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-800 border-t border-gray-700">
        {participants
          .filter(p => p.id !== peerId)
          .map(participant => (
            <div
              key={participant.id}
              className="w-1/4 h-24 bg-gray-700 border border-blue-400 cursor-pointer relative"
              onClick={() => handleMainVideoChange(participant)}
            >
              <video
                ref={el => videoRefs.current[participant.id] = el}
                className="object-cover w-full h-full"
                autoPlay
                muted={!participant.micOn}
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {participant.id}
              </div>
            </div>
          ))}
      </div>

      {/* Controls */}
      <div className="p-4 flex justify-center bg-gray-800 border-t border-gray-700">
        <button
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          onClick={() => toggleMic(peerId)}
        >
          {participants.find(p => p.id === peerId)?.micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          onClick={() => toggleVideo(peerId)}
        >
          {participants.find(p => p.id === peerId)?.videoOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          onClick={isScreenSharing ? stopScreenShare : startScreenShare}
        >
          <FaDesktop />
        </button>
        <input
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          type="text"
          value={remotePeerIdValue}
          onChange={e => setRemotePeerIdValue(e.target.value)}
          placeholder="Remote Peer ID"
        />
        <button
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          onClick={() => call(remotePeerIdValue)}
        >
          Call
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 mx-2 rounded"
          onClick={hangUp}
        >
          <FaPhoneSlash />
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          onClick={toggleRoomIdModal}
        >
          Show Room ID
        </button>
      </div>
    </div>
  );
};

export default VideoConference;
