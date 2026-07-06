
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import Profile from './pages/Profile/Profile';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css'

function App() {

  return (
    <>
      < Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resumeanalyzer" element={<ResumeAnalyzer />} />
      </Routes>
      < Footer/>
    </>
  )
}

export default App
