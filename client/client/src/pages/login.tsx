//import '../stylesheets/login.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { generateKeyPair } from '../helpers/cryptography';

export function Login() {
    const navigate = useNavigate();
    const localStorageUsername = localStorage.getItem("username");

    // Navigates to the Login page is the user is not saved in local storage, i.e. not logged in.
    useEffect(() => {
        if (localStorageUsername !== null) {
            navigate('/contacts');
        }
    }, [localStorageUsername]);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page reload on pressing button. 
        //alert(usernameRef.current.value + " - " + passwordRef.current.value);
        // ADD FUNCTIONALITY TO GET IF USER EXISTS BLA BLA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        generateKeyPair();

        localStorage.setItem("username", usernameRef.current.value);
        navigate("/contacts");
    };

    return (
        <>
            <div id="loginPanel">
                <h1>Login Panel</h1>
                <input name="username" type="text" placeholder="Username" ref={usernameRef}/>
                <input name="password" type="password" placeholder="Password" ref={passwordRef}/>
                <button type="submit" onClick={handleSubmit}>Login</button>
                {/*<Link to="/chat">CHAT LINK</Link>*/}
            </div>
        </>
    );
}

