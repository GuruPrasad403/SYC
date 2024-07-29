import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Make sure the path to your Login component is correct
import Signup from './components/Signup'; // Make sure the path to your Login component is correct
import Forgetpassword from './components/Forgetpassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
      </Routes>
    </Router>
  );
}

export default App;
