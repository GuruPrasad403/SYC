import React, { useEffect, useRef, useState } from 'react';
import 'react-chat-elements/dist/main.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChatAtoms,CreateidAtom, textAtom } from '../atoms/atom';
import { useParams, useLocation } from 'react-router-dom';
import socket from '../connections/socketcon';

export default function ChatPart() {
    const [messages, setMessage] = useRecoilState(ChatAtoms);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="grid grid-rows-6  grid-flow-col w-full  h-full leading-10">
            <div className="w-96 h-screen text-white bg-zinc-700  row-span-6 fixed flex flex-col">
                <Headers />
                <div className="flex-grow p-2 text-black overflow-y-auto">
                    {messages.map((ele, index) => (
                        <ChatMesg key={index} name={ele.name} src={ele.src} message={ele.message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <TextArea />
            </div>
        </div>
    );
}

const Headers = () => {
    return (
        <div className='flex flex-cols justify-center items-center underline-animation text-white-500 p-2'>
            <div className="relative flex h-3 w-3 m-2">
                <span className="inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-blink"></span>
                <span className="relative inline-flex rounded-full h-3 w-full bg-red-600"></span>
            </div>
            <h1 className='text-2xl'>Live Chat</h1>
        </div>
    );
}

const ChatMesg = ({ name, src, message, }) => {
    return (
        <div className={`flex items-end mb-4 `}>
            { 
                <img className='rounded-full w-10 h-10 mr-2' src={src} alt={name} />
            }
            <div className={`flex flex-col max-w-xs `}>
                {
                    <p className='text-xs text-white '>{name}</p>
                }
                <div className={`relative px-4 py-2 rounded-lg bg-orange-200 `}>
                    <p className='text-sm'>{message}</p>
                </div>
            </div>
        </div>
    );
}


const TextArea = () => {
    const data = useRecoilValue(CreateidAtom)
    console.log("thiis is an "+data)
    const location = useLocation();
    const { yourName, id } = data;
    const [textmessage, setTextMessage] = useRecoilState(textAtom);
    const [messages, setMessage] = useRecoilState(ChatAtoms);
    const params = useParams();
    const { userid } = params;
    console.log(userid)

    useEffect(() => {
        socket.emit('room-id', id);

        socket.on('joinmessage', (data) => {
            console.log(data);
        });

        socket.on('rec-msg', (data) => {
            console.log("This is a message emitted from server: " + data);
            setMessage((value) => [
                ...value,
                {
                    id: data.room,
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJIwASCJpICHRbFDOQXQ2S-pmikc8vs6K2GA&s",
                    message: data.mess,
                    name: data.name,
                    time: "2:55 PM"
                }
            ]);
        });

        // Clean up the socket listeners when the component unmounts
        return () => {
            socket.off('rec-msg');
            socket.off('joinmessage');
        };
    }, [id, setMessage]);

    const sendmessage = (e) => {
        e.preventDefault();
        console.log("Button pressed");
        socket.emit('current-msg', {
            room: id,
            name: yourName,
            mess: textmessage
        });
        setTextMessage("");
    };

    return (
        <div className='bg-gray-50 dark:bg-gray-700 p-2'>
            <form className='flex items-center' onSubmit={sendmessage}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <textarea
                    id="chat"
                    rows="1"
                    value={textmessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    className="block mx-4 p-2.5 w-full  text-sm text-gray900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                ></textarea>
                <button type="submit" className="hover:text-white inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                </button>
            </form>
        </div>
    );
}
