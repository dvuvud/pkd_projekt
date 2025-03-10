import "../stylesheets/contacts.css";
import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Contacts() {
    const navigate = useNavigate();
    const recipientRef = useRef(null);

    const handleSubmit = (event): void => {
        event.preventDefault(); // Prevents page reload on pressing button. 
        
        axios.get("user", {params: {
            username: recipientRef.current.value
        }})
        .then(function (response) {
            //console.log(response.data);
            localStorage.setItem("recipient", response.data.username); 
            localStorage.setItem("recipient_public_key", response.data.publicKey); 
            navigate("/chat");
        })
    };
     
    return (
        <>
            <Link to="/" onClick={()=>{localStorage.clear()}}>LOGOUT</Link>
            <div id="contactsPanel">
                <h1>CONTACTS</h1>
                <input className="searchbar" name="username" type="text" placeholder="Search user" ref={recipientRef}/>
                <button className="searchButton" onClick={handleSubmit}>Start Chat</button>
            </div>
        </>
    );
}
