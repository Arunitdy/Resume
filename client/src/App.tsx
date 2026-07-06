import { useState } from 'react'
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
      {/*< ResumeAnalyzer/>*/}
      < Auth/>
      < Footer/>
    </>
  )
}

export default App
