import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";





const Mainpage = () => {


    const navigate = useNavigate()
const [roomid, setroomid] = useState('')
const[yourName,setYourName]=useState('')

const generateMeetingCode = async (e) => {
    e.preventDefault();
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 9;
    const groupSize = 3;
    const groupCount = 3;

    let roomid = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomid += characters[randomIndex];

        // Add hyphen after every groupSize characters except for the last group
        if ((i + 1) % groupSize === 0 && i !== codeLength - 1) {
            roomid += '-';
        }
    }
    await setroomid(roomid)
    console.log(roomid)
    const data = {
        
yourName : yourName,
id :roomid,
    }
    navigate(`/chat/${roomid}`,{state:data})

}

const [joinroomid, setjoinroomid] = useState('')

const joinRoom = (e) => {
    e.preventDefault()
    const data = {
        yourName : yourName,
id : joinroomid
    }
    navigate(`/chat/${joinroomid},`,{state:data})

}



return (
    <div>
        <div className="flex justify-center items-center w-screen h-screen bg-zinc-800">


            <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#3e3d3d] rounded-2xl shadow-xl">
                <div className="flex flex-row gap-3 pb-4">

                    <h1 className="text-3xl text-center font-bold text-[#d3d7dd] my-auto">SYNC</h1>
                </div>
                <div className="text-2xl  text-[#76797e] pb-8">Create , Connect , Convey </div>
                <form className="flex flex-col">
                    <div className="pb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#ffffff]">Create Room</label>
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"
                                    onClick={(e) => {
                                        if (visible) {
                                            password.current.style.color = "Black"
                                            type.current.setAttribute('type', "text")
                                            setVisible(false)
                                        }
                                        else {
                                            password.current.style.color = "gray"
                                            type.current.setAttribute('type', "password")
                                            setVisible(true)
                                        }

                                    }}
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M12 8v8"></path>
                                    <path d="m8.5 14 7-4"></path>
                                    <path d="m8.5 10 7 4"></path>
                                </svg>
                            </span>
                            <input type={"text"} onChange={(e) => {
                                setYourName(e.target.value)
                            }} name="password" id="password" placeholder="Enter Your Name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
                        </div>
                        <button type="submit" onClick={generateMeetingCode} className="w-full hover:bg-zinc-600 hover:text-balck text-[#ffffff] bg-[#232327] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Create Room</button>
                        


                    </div>
                    <div className="pb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#ffffff]">Join a room</label>
                        <input type={"text"} onChange={(e) => {
                                setYourName(e.target.value)
                            }} name="password" id="password" placeholder="Enter Your Name" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
                        <div className="relative text-gray-400">
                            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"
                                    onClick={(e) => {
                                        if (visible) {
                                            password.current.style.color = "Black"
                                            type.current.setAttribute('type', "text")
                                            setVisible(false)
                                        }
                                        else {
                                            password.current.style.color = "gray"
                                            type.current.setAttribute('type', "password")
                                            setVisible(true)
                                        }

                                    }}
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                                    <path d="M12 8v8"></path>
                                    <path d="m8.5 14 7-4"></path>
                                    <path d="m8.5 10 7 4"></path>
                                </svg>
                            </span>
                            <input type={"text"} onChange={(e) => {
                                setjoinroomid(e.target.value)
                            }} name="password" id="password" placeholder="••••••••••" className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4" autoComplete="new-password" aria-autocomplete="list" />
                        </div>
                    </div>

                    <button type="submit" onClick={joinRoom} className="w-full hover:bg-zinc-600 hover:text-balck text-[#ffffff] bg-[#232327] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">join room</button>
                    <div className="flex flex-cols justify-evenly items-Center">

                    </div>
                </form>

                <form>

                </form>
            </div>
        </div>
    </div>

)
}


export default Mainpage