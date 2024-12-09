import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlist from './Pages/userlist';
import EditUser from './Pages/editlist';
import './App.css';

function App() {
  const [updatedUsers, setUpdatedUsers] = useState([]); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userlist updatedUsers={updatedUsers} setUpdatedUsers={setUpdatedUsers} />} />
        <Route path="/edit/:userId" element={<EditUser setUpdatedUsers={setUpdatedUsers} />} />
      </Routes>
    </Router>
  );
}

export default App;
