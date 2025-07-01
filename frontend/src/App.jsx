import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TopSellers from './pages/home/TopSeller'

function App() {

  return (
<>
  <Navbar/>
  <main className='min-h-screen max-w-screen-2xl mx-auto px-10 py-6 
  '>
  <Outlet/>

  </main>
  <Footer/>
  
</>
  )
}

export default App
