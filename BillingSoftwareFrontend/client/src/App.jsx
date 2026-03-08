import React from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import DashBoard from './pages/DashBoard/DashBoard'
import ManageCategories from './pages/ManageCategories/ManageCategories'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import Login from './pages/Login/Login'
import OrderHistory from './components/OrderHistory/OrderHistory'

const App = () => {
  const location=useLocation()
  return (
    <div>
    {location.pathname!=="/login"?<MenuBar/>:<Login/>}
     
      <Routes>
        <Route path="/dashboard" element={< DashBoard/>} />
        <Route path="/category" element={<ManageCategories />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<OrderHistory />} />
      </Routes>

    </div>
  )
}

export default App
