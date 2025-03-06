import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useLocation, useParams } from "react-router-dom";


export function Chat() {
    const [messages, setMessages] = useState([]);
    //const location = useLocation();
  
    useEffect(() => {
        axios.get('http://localhost:5000/message')
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


    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <h1>Logged in as {localStorage.getItem("username")}</h1>
            {printMessages(messages)}
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