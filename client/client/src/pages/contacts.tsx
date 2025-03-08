import "../stylesheets/contacts.css";
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { generateKeyPair } from '../helpers/cryptography';
import axios from 'axios';

export function Contacts() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);

    const handleSubmit = (event): void => {
        event.preventDefault(); // Prevents page reload on pressing button. 
       
        axios.get('http://localhost:5000/user', {
            params:{
                username: {usernameRef} 
            }
        })
        .then(function (response) {
            console.log(response.data);
            localStorage.setItem("recipient", response.data.username); // CHANGE TO REAL RECIPIENT
            localStorage.setItem("recipientPublicKey", response.data.publickey)
            navigate("/chat");
            // WHAT TO DO WITH USER DATA ?!?!?!?!?!?!?!?!?!?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            localStorage.setItem("recipient", "PLACEHOLDER"); // CHANGE TO REAL RECIPIENT
            navigate("/chat");
        })
        .finally(function () {
            // always executed
        });

        //generateKeyPair();
    };
     
    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <h1>CONTACTS</h1>
            <div id="contactsPanel">
                <input name="username" type="text" placeholder="Search user" ref={usernameRef}/>
                <button onClick={handleSubmit}>Start Chat</button>
            </div>
        </>
    );
}

