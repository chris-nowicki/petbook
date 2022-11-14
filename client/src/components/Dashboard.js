import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// This is a temporary login thing, it doesn't hit the database, Chris will need to update/remove this

function Dashboard(){

    const navigate = useNavigate()
    const[userName, setUserName] = useState('')

    const handleSubmit =(e)=>{
        e.preventDefault()
        localStorage.setItem('userName', userName);
        navigate('/chat');
    }
return(
    <div>Dashboard
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Sign in to Open Chat</h2>
            <label htmlFor="username">Username</label>
        <input
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="username__input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        <button className="home__cta">SIGN IN</button>
  </form>
  </div>
)
}
export default Dashboard;