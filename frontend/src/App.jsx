import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TopSellers from './pages/home/TopSeller'
import {  AuthProvider } from './context/AuthContext'

function App() {

  return (
<>
 <AuthProvider>
  <Navbar/>
  <main className='min-h-screen mx-auto   
  '>
  <Outlet/>
 
  </main>
  <Footer/>
  </AuthProvider>
</>
  )
}

export default App
