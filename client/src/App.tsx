import { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      < Navbar/>
      < ResumeAnalyzer/>
      < Footer/>
    </>
  )
}

export default App
