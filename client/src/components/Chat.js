import React, {useState} from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
//uses view for the Chat components
const Chat = ({socket}) => {

  return (
    <div>Chat
        <div>
            <ChatBar/>
        </div>
        <div>
            <ChatBody/>
            <ChatFooter socket={socket}/>
        </div>

    </div>
  )
}

export default Chat