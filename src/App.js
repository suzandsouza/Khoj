import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Funder from './pages/funder'
import Researcher from './pages/researcher'
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/funder" element={<Funder />}/>
        <Route path="/researcher" element={<Researcher/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;