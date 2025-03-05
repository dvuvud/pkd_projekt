import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'




function App() {
  const [messages, setMessages] = useState([]);

  function printMessages() {
    return({
      messages.map((item) => )
    });
  }
  
  useEffect(() => {
    axios.get('http://localhost:5000/message')
    .then(function (response) {
      setMessages(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  },[]);


  return (
    <>
      <p>{messages.length !== 0 ? messages[0].id : "Åh nej!"}</p>
      <p>HEJ HEJ</p>
    </>
  )
}

export default App
