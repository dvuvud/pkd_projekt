import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [messages, setMessages] = useState([]);
  
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


  return (
    <>
      {printMessages(messages)}
    </>
  )
}


function printMessages(messages) {
  if(messages.length === 0) {
    return(<p>Zero messages found.</p>);
  } 
  return(
    <>
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
    </>
  );
}


export default App;