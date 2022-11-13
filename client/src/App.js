import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import CreateCat from './components/CreateCat';
import CreateDog from './components/CreateDog'
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

function App() {


  const [socket] = useState(() => io(':8001'));

  useEffect(() => {
    console.log("Effect running")
    socket.on("Welcome", data => console.log(data));
    return () => socket.disconnect(true);
  }, [])

  return (
    <div className="App">
      <h1>App</h1>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard socket={socket} />}/>
            <Route path="/chat" element={<Chat socket={socket} />}/>
            <Route path='/createcat' element={<CreateCat />} />
            <Route path='/createdog' element={<CreateDog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
