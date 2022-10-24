import React, { useEffect, useRef, useState } from 'react'
import Conversation from "../Chat/conversations/Conversation";
import Messages from "../Chat/message/Message";
import "../../assets/CSS/Message.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../../context/AuthProvider.js";
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
axios.defaults.withCredentials = true;

function Message() {
  const {user} = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const [conv, setconv] = useState([])
  const scrollRef = useRef();
 
  
  
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/message/'+currentChat?._id,
      headers: { 
        'Content-Type': 'application/json'
      },
      data :""
    }; 
    axios(config)
    .then(function (response) {
      setMessages(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[currentChat]);

  useEffect(() => {

    var config = {
      method: 'get',
      url: 'http://localhost:8000/conversation/'+user?._id,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : ""
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setConversations(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  },);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      "conversationId": currentChat._id,
      "sender": user?._id,
      "text": newMessage
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:8000/message',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setMessages([...messages, response.data]);
      setNewMessage("");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
    <section className='sectionM'>
      <br/>
    {/* <div className='Mtittle'>
      <span>Boîte de Discussions</span>
    </div> */}

    <div className="messenger">
        <div className="chatMenu">
          
          <div className="chatMenuWrapper">
            <div className='conv_input'><input type="text" placeholder='Rechercher...' /><br/></div>
            {conversations.length ? (<>
            </>):(<><div className='noConv'>Vous n'avez aucune conversation. Vous ne pouvez entamer de convertions que lorsque vous ferez une reservation ou si l'un de vos trajets a ete reserve.</div></>)}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} own1={c?._id === currentChat?._id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
      
          <div className="chatBoxWrapper">
          {currentChat ? (
              <>
                <div className="chatBoxTop">
                  
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Messages message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
         
          </div>

        </div>
     
    </div> 
    <div><br/></div>
    </section>
    </>
    
  )
}

export default Message