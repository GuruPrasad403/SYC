import React, { useEffect, useMemo, useRef, useState } from 'react'
import {io, Socket} from 'socket.io-client'
import { useParams } from 'react-router-dom'
const Room = ({socket}) => {
    const params = useParams();
    const {roomid} = params
    console.log(roomid)


     const [ messge,setmessage]=useState('');

const socketRef = useRef(null);
useEffect(()=>{
    socketRef.current = io('http://localhost:3000/');
    socketRef.current.on('message',(data)=>{
console.log(data)
    })


    
    return()=>{
        socketRef.current.disconnect();
        console.clear()
    }
},[])
const sendmessage = (e) =>{
e.preventDefault();
socket.on('message',messge)

}
    
      socket.on('rec',(data)=>{
        console.log(data)
      })
      


  return (
    
    <div><h1>Romm Id {roomid}</h1>
    
    <input type="text"  placeholder='enter a message' onChange={(e)=>setmessage(e.target.value)}/>
    <button onClick={sendmessage}>send</button>
    
    </div>
  )
}

export default Room


