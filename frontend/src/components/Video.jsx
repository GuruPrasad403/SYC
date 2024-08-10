// import React, { useState } from 'react';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

// const VideoConference = () => {
//     const [participants, setParticipants] = useState([
//         { id: 1, name: 'Alice', videoSrc: 'https://example.com/videos/alice.mp4', micOn: true, videoOn: true },
//         { id: 2, name: 'Bob', videoSrc: 'https://example.com/videos/bob.mp4', micOn: true, videoOn: true },
//         { id: 3, name: 'Charlie', videoSrc: 'https://example.com/videos/charlie.mp4', micOn: true, videoOn: true },
//         { id: 4, name: 'Dhanush', videoSrc: 'https://example.com/videos/dhanush.mp4', micOn: true, videoOn: true },
//         { id: 5, name: 'Elvate', videoSrc: 'https://example.com/videos/elvate.mp4', micOn: true, videoOn: true },
//         { id: 6, name: 'Faran', videoSrc: 'https://example.com/videos/faran.mp4', micOn: true, videoOn: true },
//         { id: 7, name: 'Grace', videoSrc: 'https://example.com/videos/grace.mp4', micOn: true, videoOn: true },
//         { id: 8, name: 'Henry', videoSrc: 'https://example.com/videos/henry.mp4', micOn: true, videoOn: true },
//         { id: 9, name: 'Isla', videoSrc: 'https://example.com/videos/isla.mp4', micOn: true, videoOn: true },
//         { id: 10, name: 'Jack', videoSrc: 'https://example.com/videos/jack.mp4', micOn: true, videoOn: true },
//         { id: 11, name: 'Kara', videoSrc: 'https://example.com/videos/kara.mp4', micOn: true, videoOn: true },
//         { id: 12, name: 'Liam', videoSrc: 'https://example.com/videos/liam.mp4', micOn: true, videoOn: true },
//         { id: 13, name: 'Mia', videoSrc: 'https://example.com/videos/mia.mp4', micOn: true, videoOn: true },
//         { id: 14, name: 'Nina', videoSrc: 'https://example.com/videos/nina.mp4', micOn: true, videoOn: true },
//         { id: 15, name: 'Omar', videoSrc: 'https://example.com/videos/omar.mp4', micOn: true, videoOn: true },
//         { id: 16, name: 'Pia', videoSrc: 'https://example.com/videos/pia.mp4', micOn: true, videoOn: true },
//         { id: 17, name: 'Quinn', videoSrc: 'https://example.com/videos/quinn.mp4', micOn: true, videoOn: true },
//         { id: 18, name: 'Ravi', videoSrc: 'https://example.com/videos/ravi.mp4', micOn: true, videoOn: true },
//         { id: 19, name: 'Sara', videoSrc: 'https://example.com/videos/sara.mp4', micOn: true, videoOn: true },
//         { id: 20, name: 'Tom', videoSrc: 'https://example.com/videos/tom.mp4', micOn: true, videoOn: true },
//         { id: 21, name: 'Uma', videoSrc: 'https://example.com/videos/uma.mp4', micOn: true, videoOn: true },
//         { id: 22, name: 'Vera', videoSrc: 'https://example.com/videos/vera.mp4', micOn: true, videoOn: true },
//         { id: 23, name: 'Will', videoSrc: 'https://example.com/videos/will.mp4', micOn: true, videoOn: true },
//         { id: 24, name: 'Xena', videoSrc: 'https://example.com/videos/xena.mp4', micOn: true, videoOn: true },
//         { id: 25, name: 'Yara', videoSrc: 'https://example.com/videos/yara.mp4', micOn: true, videoOn: true },
//         { id: 26, name: 'Zara', videoSrc: 'https://example.com/videos/zara.mp4', micOn: true, videoOn: true },
//     ]);

//     const [mainParticipant, setMainParticipant] = useState(participants[0]);

//     const handleMainVideoChange = (participant) => {
//         setMainParticipant(participant);
//     };

//     const toggleMic = (id) => {
//         setParticipants(participants.map(p => p.id === id ? { ...p, micOn: !p.micOn } : p));
//     };

//     const toggleVideo = (id) => {
//         setParticipants(participants.map(p => p.id === id ? { ...p, videoOn: !p.videoOn } : p));
//     };

//     return (
//         <div className="h-screen flex flex-col bg-gray-900">
//             <div className="flex flex-grow overflow-hidden lg:flex-row flex-col">
//                 {/* Main Video Section */}
//                 <div className="lg:w-3/4 w-full lg:h-full h-screen bg-red-500 relative overflow-hidden">
//                     <video
//                         className="object-cover w-full h-full"
//                         src={mainParticipant.videoOn ? mainParticipant.videoSrc : ''}
//                         autoPlay
//                         muted={!mainParticipant.micOn}
//                     />
//                     <div className="absolute bottom-2 left-2 text-white">
//                         <p>{mainParticipant.name}</p>
//                         <div className="flex space-x-2 mt-2">
//                             <button 
//                                 className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition" 
//                                 onClick={(e) => { e.stopPropagation(); toggleMic(mainParticipant.id); }}
//                             >
//                                 {mainParticipant.micOn ? (
//                                     <FaMicrophone className="text-white text-lg" />
//                                 ) : (
//                                     <FaMicrophoneSlash className="text-red-400 text-lg" />
//                                 )}
//                             </button>
//                             <button 
//                                 className="bg-gray-800 p-2 sm:p-0 rounded-full hover:bg-gray-700 transition" 
//                                 onClick={(e) => { e.stopPropagation(); toggleVideo(mainParticipant.id); }}
//                             >
//                                 {mainParticipant.videoOn ? (
//                                     <FaVideo className="text-white text-lg" />
//                                 ) : (
//                                     <FaVideoSlash className="text-red-400 text-lg" />
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Side Videos Section */}
//                 <div className="lg:w-1/4 w-full  pt-10 h-42 lg:h-full overflow-y-auto bg-purple-500 flex-shrink-0">
//                     <div className="flex flex-row lg:flex-col lg:h-full">
//                         {participants
//                             .filter((p) => p.id !== mainParticipant.id)
//                             .map((participant) => (
//                                 <div
//                                     key={participant.id}
//                                     className="w-24 h-24 lg:w-full lg:h-40 bg-indigo-500 mx-2 my-2 relative flex-shrink-0"
//                                     onClick={() => handleMainVideoChange(participant)}
//                                 >
//                                     <video
//                                         className="object-cover w-full h-full"
//                                         src={participant.videoOn ? participant.videoSrc : ''}
//                                         autoPlay
//                                         muted={!participant.micOn}
//                                     />
//                                     <div className="absolute bottom-2 left-2 text-white">
//                                         <p>{participant.name}</p>
//                                         <div className="flex space-x-2 mt-2">
//                                             <button 
//                                                 className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition" 
//                                                 onClick={(e) => { e.stopPropagation(); toggleMic(participant.id); }}
//                                             >
//                                                 {participant.micOn ? (
//                                                     <FaMicrophone className="text-white text-lg" />
//                                                 ) : (
//                                                     <FaMicrophoneSlash className="text-red-400 text-lg" />
//                                                 )}
//                                             </button>
//                                             <button 
//                                                 className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition" 
//                                                 onClick={(e) => { e.stopPropagation(); toggleVideo(participant.id); }}
//                                             >
//                                                 {participant.videoOn ? (
//                                                     <FaVideo className="text-white text-lg" />
//                                                 ) : (
//                                                     <FaVideoSlash className="text-red-400 text-lg" />
//                                                 )}
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Controls */}
//             <div className="p-4 flex justify-center bg-gray-800">
//                 <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded">Mic</button>
//                 <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded">Camera</button>
//                 <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded">Screen Share</button>
//                 <button className="bg-red-600 text-white px-4 py-2 mx-2 rounded">Leave</button>
//             </div>
//         </div>
//     );
// };

// export default VideoConference;


import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaFileUpload, FaFileDownload } from 'react-icons/fa';

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

const VideoConference = () => {
  const [participants, setParticipants] = useState([]);
  const [mainParticipant, setMainParticipant] = useState(null);
  const [streams, setStreams] = useState({});
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [files, setFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const localStreamRef = useRef(null);
  const peerInstance = useRef(null);
  const videoRefs = useRef({});
  const connections = useRef({});

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (localStreamRef.current) {
          localStreamRef.current.srcObject = mediaStream;
          localStreamRef.current.play();
        }
        setStreams(prevStreams => ({ ...prevStreams, local: mediaStream }));

        const peer = new Peer(generateMeetingCode());
        peer.on('open', (id) => {
          setPeerId(id);
          setParticipants(prevParticipants => [...prevParticipants, { id, name: 'You', micOn: true, videoOn: true }]);
        });

        peer.on('call', (call) => {
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            setParticipants(prevParticipants => {
              if (!prevParticipants.find(p => p.id === call.peer)) {
                return [...prevParticipants, { id: call.peer, name: `Peer ${call.peer}`, micOn: true, videoOn: true }];
              }
              return prevParticipants;
            });
            setStreams(prevStreams => ({ ...prevStreams, [call.peer]: remoteStream }));
          });
        });

        peer.on('connection', (conn) => {
          connections.current[conn.peer] = conn;
          conn.on('data', (data) => {
            if (data.file) {
              setReceivedFiles(prevFiles => [...prevFiles, data.file]);
            }
          });
        });

        peerInstance.current = peer;
      })
      .catch((error) => console.error('Error accessing media devices.', error));
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
        setParticipants(prevParticipants => {
          if (!prevParticipants.find(p => p.id === remotePeerId)) {
            return [...prevParticipants, { id: remotePeerId, name: `Peer ${remotePeerId}`, micOn: true, videoOn: true }];
          }
          return prevParticipants;
        });
        setStreams(prevStreams => ({ ...prevStreams, [remotePeerId]: remoteStream }));
      });

      const conn = peerInstance.current.connect(remotePeerId);
      connections.current[remotePeerId] = conn;
      conn.on('data', (data) => {
        if (data.file) {
          setReceivedFiles(prevFiles => [...prevFiles, data.file]);
        }
      });
    }
  };

  const toggleMic = (id) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      const micOn = !participant.micOn;
      setParticipants(participants.map(p => p.id === id ? { ...p, micOn } : p));
      const audioTrack = streams.local?.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = micOn;
      }
    }
  };

  const toggleVideo = (id) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      const videoOn = !participant.videoOn;
      setParticipants(participants.map(p => p.id === id ? { ...p, videoOn } : p));
      const videoTrack = streams.local?.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = videoOn;
      }
    }
  };

  const handleMainVideoChange = (participant) => {
    setMainParticipant(participant);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles([...files, file]);
      Object.values(connections.current).forEach(conn => {
        conn.send({ file });
      });
    }
  };

  const hangUp = () => {
    // Stop local media tracks
    const localStream = streams.local;
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    // Close PeerJS connections
    Object.values(connections.current).forEach(conn => conn.close());

    // Disconnect PeerJS
    peerInstance.current?.destroy();
    
    // Clear state
    setParticipants([]);
    setStreams({});
    setPeerId('');
    setFiles([]);
    setReceivedFiles([]);
    peerInstance.current = null;
    connections.current = {};
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="flex flex-grow overflow-hidden relative">
        {/* Main Video Section */}
        <div className="absolute inset-0">
          <video
            className="object-cover w-full h-full"
            ref={localStreamRef}
            autoPlay
            muted={!participants.find(p => p.id === peerId)?.micOn}
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {peerId}
          </div>
          {mainParticipant && streams[mainParticipant.id] && (
            <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gray-800 border border-yellow-400">
              <video
                className="object-cover w-full h-full"
                ref={el => videoRefs.current[mainParticipant.id] = el}
                autoPlay
                muted={!mainParticipant.micOn}
              />
            </div>
          )}
        </div>

        {/* Side Videos Section */}
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-transparent flex overflow-x-auto">
          {participants
            .filter((p) => p.id !== mainParticipant?.id && p.id !== peerId)
            .map((participant) => (
              <div
                key={participant.id}
                className="w-1/4 h-full flex-shrink-0 border border-blue-400 relative"
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
      </div>

      {/* Controls */}
      <div className="p-4 flex justify-center bg-gray-800">
        <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => toggleMic(peerId)}>
          {participants.find(p => p.id === peerId)?.micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => toggleVideo(peerId)}>
          {participants.find(p => p.id === peerId)?.videoOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <input
          className="bg-gray-700 text-white px-4 py-2 mx-2 rounded"
          type="text"
          value={remotePeerIdValue}
          onChange={e => setRemotePeerIdValue(e.target.value)}
          placeholder="Remote Peer ID"
        />
        <button className="bg-gray-700 text-white px-4 py-2 mx-2 rounded" onClick={() => call(remotePeerIdValue)}>Call</button>
        <button className="bg-red-600 text-white px-4 py-2 mx-2 rounded" onClick={hangUp}>Hang Up</button>
        <label className="bg-gray-700 text-white px-4 py-2 mx-2 rounded cursor-pointer">
          <FaFileUpload />
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* Shared Files */}
      <div className="p-4 bg-gray-800 text-white">
        <h3>Shared Files:</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <FaFileDownload /> {file.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Received Files */}
      <div className="p-4 bg-gray-800 text-white">
        <h3>Received Files:</h3>
        <ul>
          {receivedFiles.map((file, index) => (
            <li key={index}>
              <a href={URL.createObjectURL(file)} download={file.name}>
                <FaFileDownload /> {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoConference;
