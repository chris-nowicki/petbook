import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages }) => {
    const navigate = useNavigate()
    const leaveChatHandler = () => {
        localStorage.removeItem('userName');
        navigate('/')
        window.location.reload() //this will reset the page, only in here for testing
    }

    return (
        <>
            <div>
                <header className="chat__mainHeader">
                    <p>Hangout with Colleagues</p>
                    <button className="leaveChat__btn" onClick={leaveChatHandler}>
                        LEAVE CHAT
                    </button>
                </header>

                {/*This shows messages sent from you*/}
                <div className="message__container">
                    {messages.map((message, index) =>
                        <div>
                            {message.message}
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default ChatBody