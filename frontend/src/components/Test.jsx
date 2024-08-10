import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

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

const TEST = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [peers, setPeers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const peer = new Peer(generateMeetingCode());

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);

          call.on('stream', (remoteStream) => {
            setPeers((prevPeers) => [
              ...prevPeers,
              { peerId: call.peer, stream: remoteStream },
            ]);
          });
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error);
        });
    });

    peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        if (data instanceof ArrayBuffer) {
          // Handle file data
          const blob = new Blob([data]);
          const url = URL.createObjectURL(blob);
          setChat((prevChat) => [
            ...prevChat,
            { sender: 'remote', message: <a href={url} download="file">Download File</a> },
          ]);
        } else {
          // Handle text message
          setChat((prevChat) => [...prevChat, { sender: 'remote', message: data }]);
        }
      });
    });

    peerInstance.current = peer;
  }, []);

  useEffect(() => {
    peers.forEach((peer) => {
      const videoElement = videoRefs.current[peer.peerId];
      if (videoElement) {
        videoElement.srcObject = peer.stream;
      }
    });
  }, [peers]);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on('stream', (remoteStream) => {
          setPeers((prevPeers) => [
            ...prevPeers,
            { peerId: remotePeerId, stream: remoteStream },
          ]);
        });

        const conn = peerInstance.current.connect(remotePeerId);
        conn.on('data', (data) => {
          if (data instanceof ArrayBuffer) {
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            setChat((prevChat) => [
              ...prevChat,
              { sender: 'remote', message: <a href={url} download="file">Download File</a> },
            ]);
          } else {
            setChat((prevChat) => [...prevChat, { sender: 'remote', message: data }]);
          }
        });
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });
  };

  const sendMessage = () => {
    if (message) {
      peers.forEach((peer) => {
        const conn = peerInstance.current.connect(peer.peerId);
        conn.send(message);
      });
      setChat((prevChat) => [...prevChat, { sender: 'self', message }]);
      setMessage('');
    }
  };

  const sendFile = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        peers.forEach((peer) => {
          const conn = peerInstance.current.connect(peer.peerId);
          conn.send(data);
        });
        setChat((prevChat) => [
          ...prevChat,
          { sender: 'self', message: 'File sent!' },
        ]);
        setSelectedFile(null);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={e => setRemotePeerIdValue(e.target.value)}
        placeholder="Enter remote peer ID"
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
        {peers.map((peer, index) => (
          <video
            key={index}
            ref={el => videoRefs.current[peer.peerId] = el}
            autoPlay
            style={{ width: '300px', height: '200px', border: '1px solid black' }}
          />
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={e => setSelectedFile(e.target.files[0])}
        />
        <button onClick={sendFile}>Send File</button>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        {chat.map((item, index) => (
          <div key={index}>
            <strong>{item.sender}: </strong>
            <span>{typeof item.message === 'string' ? item.message : item.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default TEST;
