import { useEffect, useRef } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { generateKeyPair } from '../helpers/cryptography';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { User } from '../types/user';

/**
 * Handles React logic for this page.
 * 
 * @returns {JSX.Element} The HTML to be displayed on the page.
 */
export function Login() {
    const navigate: NavigateFunction = useNavigate();
    const localStorageUsername: string | null = localStorage.getItem("username");

    // Navigates to the Login page is the user is not saved in local storage, i.e. not logged in.
    useEffect((): void => {
        if (localStorageUsername !== null) {
            navigate('/contacts');
        }
    }, [localStorageUsername]);

    const usernameRef: React.RefObject<null | HTMLInputElement> = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef(null);

    // Handles the logic for when the user submits a login. 
    // Sends a GET-request to the server to check if a user with the sent parameters exists. 
    // If so: logs in and sends the user to the Contacts page.
    const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event): void => {
        if(usernameRef.current?.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 

            axios.get<User>("user", { 
                params: {
                    username: usernameRef.current?.value
                } 
            })
            .then(function (response: AxiosResponse): void {
                if(response.data === "") {
                    alert("Username does not exist.");
                } else {
                    localStorage.setItem("username", response.data.username); 
                    navigate("/contacts");
                }
            })
            .catch(function (error: AxiosError): void {
                console.log(error);
            });
        }
    };

    // Handles the logic for when the user submits a register.
    // Sends a POST-request to the server to add a user, 
    // then logs in and sends the user to the Contacts page.
    const handleRegister: React.MouseEventHandler<HTMLButtonElement> = async(event): Promise<void> => {
        if(usernameRef.current?.value === "") {
            alert("Username field is empty.");
        } else {
            event.preventDefault(); // Prevents page reload on pressing button. 
            let alreadyExists: boolean = false;
            await axios.get<User>("user", { 
                params: {
                    username: usernameRef.current?.value
                } 
            })
            .then((res: AxiosResponse): void =>  {
                if(res.data !== "") {
                    alert("Username already exists");

                    alreadyExists = true;
                }
            })

            if(alreadyExists) {
                return;
            }

            const keys: { publicKeyPem: string; privateKeyPem: string; } = await generateKeyPair();
            
            axios.post<User>('user', {
                username: usernameRef.current?.value,
                publicKey: keys.publicKeyPem
            })
            .then((): void => {
                localStorage.setItem("username", usernameRef.current!.value);
                navigate("/contacts");
            })
            .catch(function (error: AxiosError): void {
                console.log(error);
            });
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

