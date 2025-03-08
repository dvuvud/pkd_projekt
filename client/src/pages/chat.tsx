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

    console.log(messages);
    
    const privateKey = localStorage.getItem("private_key");

    useEffect(() => {
        axios.get('chat', {params: {
            user1: localStorage.getItem("recipient"),
            user2: localStorage.getItem("username")
        }})
        .then(function (response) {
            const handleResponse = async () => {
                for (let i = 0; i < response.data.length; i++) {
                    console.log("Trying to decrypt:")
                    console.log(response.data[i].content)
                    response.data[i].content = await decryptMessage(privateKey, response.data[i].content)
                }
                
                setMessages(response.data);
            }

            handleResponse();
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }, []);

    const handleSubmit = async(event) => {
        const recipientPublicKey = localStorage.getItem("recipient_public_key");
        const recipientUsername = localStorage.getItem("recipient");
        const sender = localStorage.getItem("username");
        event.preventDefault(); // Prevents page reload on pressing button. 
        
        axios.post('message', 
            message(
                await 
                await encryptMessage(recipientPublicKey, messageRef.current.value), 
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
    
    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <Link to="/contacts">CONTACTS</Link>
            <h1>CHAT</h1>
            <h1>Logged in as {localStorage.getItem("username")}</h1>

            {printMessages(messages, privateKey)}

            <div id="chatPanel">
                <input name="chat" type="text" placeholder={"Message "+localStorage.getItem("recipient")} ref={messageRef}/>
                <button type="submit" onClick={handleSubmit}>Send</button>
            </div>
        </>
    )
}

function printMessages(messages, privateKey) {
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