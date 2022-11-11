import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

function App() {

    // const socket = socketIO.connect('http://localhost:8001') Second try
  const[socket] = useState(()=> io(':8001')); 

  useEffect(()=>{
    console.log("Effect running")
    socket.on("Welcome", data=> console.log(data));
    return ()=> socket.disconnect(true);
  }, [])

  return (
    <div className="App">
      <h1>App</h1> 
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={ <Dashboard socket={socket} />}></Route>
          <Route path="/chat" element={<Chat socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
