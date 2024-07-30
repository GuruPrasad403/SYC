import { useState } from 'react'
import ChatPart from './Components/Chatpart'
import './App.css'
import {RecoilRoot} from 'recoil'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
      <ChatPart />
    </RecoilRoot>
  )
}

export default App
