import '../stylesheets/chat.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";


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


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page reload on pressing button. 
        /*
        axios.post('http://localhost:5000/message', {
            // PARAMETERS TO SEND
        })
        .then(function (response) {
            //console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
        */
    }
    

    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <Link to="/contacts">CONTACTS</Link>
            <h1>CHAT</h1>
            <h1>Logged in as {localStorage.getItem("username")}</h1>

            {printMessages(messages)}

            <div id="chatPanel">
                <input name="username" type="text" placeholder={"Message "+localStorage.getItem("recipient")}/>
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