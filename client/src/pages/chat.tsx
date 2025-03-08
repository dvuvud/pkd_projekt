import '../stylesheets/chat.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { message as make_message } from "../../../types/message";
import { encryptMessage } from '../helpers/cryptography';


export function Chat() {
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);
    //const location = useLocation();
    
    useEffect(() => {
        axios.get('message')
        .then(function (response) {
            setMessages(response.data);
            //console.log(response.data);
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
            make_message(
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