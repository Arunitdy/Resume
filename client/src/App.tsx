import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import Auth from './pages/Auth/Auth';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < Navbar/>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<ResumeAnalyzer />} />
      </Routes>
      < Footer/>
    </>
  )
}

export default App
