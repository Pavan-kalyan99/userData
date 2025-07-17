import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/lib/PrivateRoute'
import Dashboard from './components/pages/Dashboard'

function App() {

  return (
    <>
       <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>

         {/* Private route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

       </Routes>

    </>
  )
}

export default App
