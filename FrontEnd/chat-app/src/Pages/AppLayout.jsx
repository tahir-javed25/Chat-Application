import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
     <Navbar/>
     <Outlet/>
     {/* this is footer of the app */}
    </div>
  )
}

export default AppLayout
