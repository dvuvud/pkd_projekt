import '../stylesheets/chat.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { message } from "../types/message"
import { encryptMessage, decryptMessage } from '../helpers/cryptography';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);
    //const location = useLocation();
   
    const privateKey = localStorage.getItem("private_key"); 
    const username = localStorage.getItem("username"); 

    useEffect(() => {
        axios.get('chat', {params: {
            user1: localStorage.getItem("recipient"),
            user2: localStorage.getItem("username")
        }})
        .then(function (response) {
            processMessages(response, username, privateKey);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

        setInterval(() => {  
            axios.get('message', {params: {
                user1: localStorage.getItem("recipient"),
                user2: localStorage.getItem("username")
            }})
            .then(function (response) {
                processMessages(response, username, privateKey);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }, 1000);
        //return () => clearInterval(interval);

    }, []);

    const handleSubmit = async(event) => {
        const recipientUsername = localStorage.getItem("recipient");
        const recipientPublicKey = localStorage.getItem("recipient_public_key");
        const sender = localStorage.getItem("username");
        const senderPublicKey = localStorage.getItem("public_key")

        event.preventDefault(); // Prevents page reload on pressing button. 
        
        axios.post('message', 
            message( 
                await encryptMessage(recipientPublicKey, messageRef.current.value), 
                await encryptMessage(senderPublicKey, messageRef.current.value),
                recipientUsername,
                sender
            )
        )
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }


    function processMessages(response, username, privateKey) {
        const handleResponse = async () => {
            const messagesCopy = messages;
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
            
            setMessages(messagesCopy.concat(newMessages));
            console.log(newMessages);
        }
    
        handleResponse();
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

