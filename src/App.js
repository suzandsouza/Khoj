import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from "./pages/Home"
import UserSigninApp from './pages/Signin'
import Signup from "./pages/Signup"
import Funder from './pages/funder'
import Researcher from './pages/researcher'
import MyFundingProjects from './pages/myFundingProjects'

const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<UserSigninApp/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/funder" element={<Funder />}/>
        <Route path="/researcher" element={<Researcher/>}/>
        <Route path= "/myFundingProjects" element={<MyFundingProjects/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;