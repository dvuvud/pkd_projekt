import '../stylesheets/chat.css';
import { useState, useEffect, useRef, JSX } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";
import { message, Message } from "../types/message"
import { encryptMessage, decryptMessage } from '../helpers/cryptography';

/**
 * Handles React logic for this page.
 * 
 * @returns {JSX.Element} The HTML to be displayed on the page.
 */
export function Chat() {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [contentToSend, setContentToSend] = useState<string>('');
    const messagesRef: React.RefObject<null | Array<Message>> = useRef<Array<Message>>(messages);
    const privateKey: string = localStorage.getItem("private_key")!; 
    const username: string = localStorage.getItem("username")!; 
    const updateTime: number = 250; // ms

    // Updated messageRef.
    useEffect((): void => {
        messagesRef.current = messages;
    }, [messages]);

    // Timer for how often to update the displayed messages. 
    useEffect((): void => {
        fetchMessages(true);

        setInterval((): void => {  
            fetchMessages(false);     
        }, updateTime);
    }, []);

    // Fetches messages from server. Takes a boolean that determines
    // if all messages are to be fetched, or just non-loaded ones
    function fetchMessages(loadAll: boolean) {
        axios.get('message', {params: {
            user1: localStorage.getItem("recipient"),
            user2: localStorage.getItem("username"),
            loadAll: loadAll
        }})
        .then((res: AxiosResponse) => {
            processMessages(res, username, privateKey);
        })
    }

    /**
     * Decrypts messages and updated state of messages.
     * 
     * @param {AxiosResponse} response - The messages from a GET response.
     * @param {string} username - The username of the currently logged in user.
     * @param {string} privateKey - The private key of the currently logged in user.
     */
    function processMessages(response: AxiosResponse, username: string, privateKey: string) {
        const handleResponse = async () => {
            const newMessages: Array<Message> = response.data;
            
            for (let i = 0; i < newMessages.length; i++) {
                if(newMessages[i].sender === username) {
                    newMessages[i].content_decrypted = 
                        await decryptMessage(privateKey, response.data[i].content_sender);
                } else {
                    newMessages[i].content_decrypted = 
                        await decryptMessage(privateKey, response.data[i].content_recipient);
                }
            }

            //const currentMessages = messagesRef.current;
            setMessages([...messagesRef.current!].concat(newMessages));
        }
    
        handleResponse();
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if(contentToSend === "") {
            return;
        }

        const recipientUsername: string = localStorage.getItem("recipient")!;
        const recipientPublicKey: string = localStorage.getItem("recipient_public_key")!;
        const sender: string = localStorage.getItem("username")!;
        const senderPublicKey: string = localStorage.getItem("public_key")!;

        const messageToSend: Message = message( 
            await encryptMessage(recipientPublicKey, contentToSend), 
            await encryptMessage(senderPublicKey, contentToSend),
            recipientUsername,
            sender
        );
        
        axios.post<Message>('message', messageToSend).then((): void => {
            fetchMessages(false);
        });

        setContentToSend('');
      };

    /**
     * Creates HTML code containing all the messages.
     * 
     * @param {messages} messages - The messages to be displayed. 
     * @returns {JSX.Element} The HTML to be displayed on the page.
     */
    function printMessages(messages: Array<Message>): JSX.Element {
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
    
                        <p className="content">{mes.content_decrypted}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <header>
                <nav>
                    <h1><Link to="/">Cryptalk</Link></h1>
                    <ul>
                        <li><Link to="/contacts">CONTACTS</Link></li>
                        <li><Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="chatInfo">
                <h2>Logged in as  {username}</h2>
                <p>Chatting with {localStorage.getItem("recipient")}</p>
            </div>

            <div className='scrollbar'>
                <div className='chatContainer'>
                    {printMessages(messages)}
                </div>
            </div>

            {/*<div id="chatPanel">
                    <input name="chat" type="text" placeholder={"Message "+localStorage.getItem("recipient")} ref={messageRef}/>
                    <button type="submit" onClick={handleSubmit}>Send</button>
            </div>
            */}
                <form id="chatPanel" onSubmit={handleSubmit}>
                <input
                    name="chat"
                    type="text"
                    placeholder={"Message " + localStorage.getItem("recipient")}
                    value={contentToSend}
                    onChange={(e) => setContentToSend(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </>
    )
}