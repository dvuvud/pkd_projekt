import "../stylesheets/contacts.css";
import { useRef } from 'react';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from 'axios';
import { User } from "../types/user";

/**
 * Handles React logic for this page.
 * 
 * @returns {JSX.Element} The HTML to be displayed on the page.
 */
export function Contacts() {
    const navigate: NavigateFunction = useNavigate();
    const recipientRef: React.RefObject<null | HTMLInputElement> = useRef<HTMLInputElement>(null);

    // Handles the logic for when the user submits a user they want to chat with. 
    // Sends a GET-request to the server to check if a user with the sent parameters exists. 
    // If so: gets sent to a Chatroom to chat with the chosen recipient.
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
        event.preventDefault(); // Prevents page reload on pressing button. 
        
        axios.get<User>("user", { 
            params: {
                username: recipientRef.current?.value
            }
        })
        .then(function (response: AxiosResponse): void {
            if(response.data === "") {
                alert("User does not exist.");
            } else {
                localStorage.setItem("recipient", response.data.username); 
                localStorage.setItem("recipient_public_key", response.data.publicKey); 
                navigate("/chat");
            }
        })
        .catch(function (error: AxiosError): void {
            console.log(error);
        });
    }
     
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
