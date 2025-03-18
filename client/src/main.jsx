import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import MyAccount from './components/MyAccount';
import Auth from './components/Auth';

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </Router>
);