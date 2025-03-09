import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Chat } from './pages/chat';
import { Contacts } from './pages/contacts';
import axios from 'axios';
import { serverURL } from './helpers/global_variables';

import "./stylesheets/App.css";
import "./stylesheets/login.css";


function App() {
  axios.defaults.baseURL = serverURL;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/> 
          <Route path="/chat" element={<Chat/>}/> {/* Example access page: write http://localhost: ... /#/chat in the browser */}
          <Route path="/contacts" element={<Contacts/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;