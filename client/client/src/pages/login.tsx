import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { generateKeyPair } from '../helpers/cryptography'

export function Login() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    function handleSubmit() {
        //alert(usernameRef.current.value + " - " + passwordRef.current.value);
        // ADD FUNCTIONALITY TO GET IF USER EXISTS BLA BLA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        generateKeyPair();

        localStorage.setItem("username", usernameRef.current.value);
        navigate("/chat");
    };
     
    return (
        <>
            <div id="loginPanel">
                <h1>Login Panel</h1>
                <input name="username" type="text" placeholder="Username" ref={usernameRef}/>
                <input name="password" type="password" placeholder="Password" ref={passwordRef}/>
                <button onClick={handleSubmit}>Login</button>
                <Link to="/chat">CHAT LINK</Link>
            </div>
        </>
    );
}

