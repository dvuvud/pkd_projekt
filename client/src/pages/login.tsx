//import '../stylesheets/login.css';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
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
    const handleLogin = (event) => {
        if(usernameRef.current.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 

            axios.get("user", { 
                params: {
                    username: usernameRef.current.value
                }
            })
            .then(function (response) {
                console.log(response.status);

                if(response.data === "") {
                    alert("Username does not exist.");
                } else {
                    localStorage.setItem("username", response.data.username); 
                    //localStorage.setItem("public_key", response.data.publicKey); 
                    navigate("/contacts");
                }
            })
        }
    };

    const handleRegister = async(event) => {
        if(usernameRef.current.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 
            const keys = await generateKeyPair();
            
            axios.post('user', {
                username: usernameRef.current.value,
                publicKey: keys.publicKeyPem
            })
            .then(function () {
                localStorage.setItem("username", usernameRef.current.value);

                navigate("/contacts");
            })
        }
    };

    return (
        <>
            <div id="loginPanel">
                <h1>Login</h1>
                <input name="username" type="text" placeholder="Username" ref={usernameRef}/>
                {/*<input name="password" type="password" placeholder="Password" ref={passwordRef}/>*/}
                <button className="loginButton" type="submit" onClick={handleLogin}>Login</button>
                <button className="registerButton" type="submit" onClick={handleRegister}>Register</button>
                {/*<Link to="/chat">CHAT LINK</Link>*/}
            </div>
        </>
    );
}

