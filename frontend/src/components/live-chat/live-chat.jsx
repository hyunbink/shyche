import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';
import "./live-chat.scss";
import send from "./send.png";
import chatBubble from "./chat.png";

const socket = io.connect("http://localhost:4001");
const userName = nanoid(4);


const LiveChat = () => {
    
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendChat = (e) => {
        e.preventDefault();
        if (message !== '') {
            socket.emit("chat", { message, userName });
        }
        setMessage('');
    };

    useEffect(() => {
        socket.on("chat", (payload) => {
            setChat([...chat, payload]);
        })
    })

    const fadeOut = () => {
        const container = document.getElementById('live-chat-container');
        container.classList.add('fade-out');
        setTimeout(() => {
            container.style.display = 'none';
            fadeInBubble();
        }, 1000);
    }

    const fadeIn = () => {
        fadeOutBubble();
        const container = document.getElementById('live-chat-container');
        container.classList.add('fade-in');
        setTimeout(() => {
            container.style.display = 'none';
        }, 1000);
    }

    const fadeOutBubble = () => {
        const container = document.getElementById('chat-bubble');
        container.classList.add('fade-out-bubble');
        setTimeout(() => {
            container.style.display = 'none';
        }, 1000);
    }

    const fadeInBubble = () => {
        const container = document.getElementById('chat-bubble');
        container.classList.add('fade-in-bubble');
        setTimeout(() => {
            container.style.display = 'none';
        }, 1000);
    }

    return (
        <>
            <div id='live-chat-container'>
                <div className='live-chat-box'>
                    <div
                        id='live-chat-container-header'
                        onMouseEnter={()=>dragElement(document.getElementById("live-chat-container"))}
                        onClick={fadeOut}
                    >
                        <img src="" alt="profile-picture" />
                        <div className='client-info'>
                            <h2>Username</h2>
                            <p>online</p>
                        </div>
                    </div>
                    <div className='live-chat-field'>
                        {chat.map((payload, index) => {
                            if (payload.userName === userName) {
                                return (
                                    <p
                                        key={`chat-${index}`}
                                        className='live-chat-user'
                                    >
                                        {payload.message}
                                    </p>
                                )
                            } else {
                                return (
                                    <p
                                        key={`chat-${index}`}
                                        className='live-chat-other'
                                    >
                                        {payload.message}
                                    </p>
                                )
                            }
                        })}
                    </div>

                    <form className='live-chat-text' autocomplete='off' onSubmit={sendChat}>
                        <input
                            type='text'
                            name='chat'
                            placeholder='send text'
                            value={message}
                            onChange={(e) => {
                            setMessage(e.target.value)
                            }}
                        />
                        <button type="submit"><img src={send} /></button>
                    </form>
                </div>
            </div>
            <button type='submit' className='chat-bubble' onClick={fadeIn}>
                <img src={chatBubble} alt="" onClick={fadeIn} />
            </button>
        </>
    )
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
}

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export default LiveChat;