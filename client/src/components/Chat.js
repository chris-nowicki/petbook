import React, {useState} from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
//uses view for the Chat components
const Chat = ({socket}) => {
// const [message, setMessage] = useState('');
const [messages, setMessages] = useState([])
  return (
    <div>Chat
        <div>
            <ChatBar/>
        </div>
        <div>
            <ChatBody messages ={messages} setMessages={setMessages} />
            <ChatFooter socket={socket}  messages ={messages} setMessages={setMessages} />
        </div>

    </div>
  )
}

export default Chat