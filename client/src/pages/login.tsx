//import '../stylesheets/login.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { generateKeyPair } from '../helpers/cryptography';
import axios from 'axios';

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

    const handleLogin = (event) => {
        if(usernameRef.current.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 
            
            localStorage.setItem("username", usernameRef.current.value);
            navigate("/contacts");
        }
    };
    const handleRegister = async(event) => {
        if(usernameRef.current.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 
            const keys = await generateKeyPair();

            
            axios.post('http://localhost:5000/user', {
                username: usernameRef.current.value,
                publicKey: keys.publicKeyPem
            })
            .then(function (response) {
                localStorage.setItem("username", usernameRef.current.value);
                localStorage.setItem("publicKey", keys.publicKeyPem);

                navigate("/contacts");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


            generateKeyPair();
            
            localStorage.setItem("username", usernameRef.current.value);

            navigate("/contacts");
        }
    };

    return (
        <>
            <div id="loginPanel">
                <h1>Login</h1>
                <input name="username" type="text" placeholder="Username" ref={usernameRef}/>
                <input name="password" type="password" placeholder="Password" ref={passwordRef}/>
                <button className="loginButton" type="submit" onClick={handleLogin}>Login</button>
                <button className="registerButton" type="submit" onClick={handleRegister}>Register</button>
                {/*<Link to="/chat">CHAT LINK</Link>*/}
            </div>
        </>
    );
}

