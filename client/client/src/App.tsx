import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Chat } from './pages/chat';
import { User } from './types/user';

export var userData: User;


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/> 
          <Route path="/chat" element={<Chat/>}/> {/* Example access page: write http://localhost: ... /#/chat in the browser */}
        </Routes>
      </Router>
    </>
  );
}

export default App;