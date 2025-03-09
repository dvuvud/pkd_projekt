import '../stylesheets/chat.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { message } from "../types/message"
import { encryptMessage, decryptMessage } from '../helpers/cryptography';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);
    const messagesRef = useRef(messages);
    const privateKey = localStorage.getItem("private_key"); 
    const username = localStorage.getItem("username"); 

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        fetchMessages(true);

        const interval = setInterval(() => {  
            fetchMessages(false);     
        }, 5000);
        return () => clearInterval(interval);

    }, []);

    function fetchMessages(full) {
        if(full) {
            axios.get('chat', {params: {
                user1: localStorage.getItem("recipient"),
                user2: localStorage.getItem("username")
            }})
            .then(function (response) {
                processMessages(response, username, privateKey);
            })
        }
        else{
            axios.get('message', {params: {
                user1: localStorage.getItem("recipient"),
                user2: localStorage.getItem("username")
            }})
            .then(function (response) {
                processMessages(response, username, privateKey);
            })
        }
    }

    function processMessages(response, username, privateKey) {
        const handleResponse = async () => {
            const newMessages = response.data;
            
            for (let i = 0; i < newMessages.length; i++) {
                if(newMessages[i].sender === username){
                    newMessages[i] = {
                        ...newMessages[i],
                        content: await decryptMessage(privateKey, response.data[i].content_sender)
                    }
                }
                else{
                    newMessages[i] = {
                        ...newMessages[i],
                        content: await decryptMessage(privateKey, response.data[i].content_recipient)
                    }
                }
            }

            setMessages([...messagesRef.current].concat(newMessages));
        }
    
        handleResponse();
    }

    const handleSubmit = async(event) => {
        const recipientUsername = localStorage.getItem("recipient");
        const recipientPublicKey = localStorage.getItem("recipient_public_key");
        const sender = localStorage.getItem("username");
        const senderPublicKey = localStorage.getItem("public_key")

        event.preventDefault(); // Prevents page reload on pressing button. 

        const messageToSend = message( 
            await encryptMessage(recipientPublicKey, messageRef.current.value), 
            await encryptMessage(senderPublicKey, messageRef.current.value),
            recipientUsername,
            sender
        )

        let messageLocal = message( 
            messageRef.current.value, 
            messageRef.current.value,
            recipientUsername,
            sender
        )
        
        const newMessages = [...messages]
        //newMessages.push(messageLocal);
        
        axios.post('message', messageToSend).then(() => {
            //setMessages(newMessages)
            fetchMessages(false);
        })
    }

    function printMessages(messages) {
        if(messages.length === 0) {
            return(<p>Zero messages found.</p>);
        } 
    
        return(
            <div className="messageList">
                {messages.map((mes, i) => (
                    <div className="message" key={i}>
                        <div className="top">
                        <p className="sender">{mes.sender}</p>
                        <p className="timestamp">{mes.timestamp}</p>
                        </div>
    
                        <p className="content">{mes.content}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <Link to="/contacts">CONTACTS</Link>
            <h1>CHAT</h1>
            <h1>Logged in as {localStorage.getItem("username")}</h1>

            {printMessages(messages)}

            <div id="chatPanel">
                <input name="chat" type="text" placeholder={"Message "+localStorage.getItem("recipient")} ref={messageRef}/>
                <button type="submit" onClick={handleSubmit}>Send</button>
            </div>
        </>
    )
}