import React, { useContext } from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import DashBoard from './pages/DashBoard/DashBoard'
import ManageCategories from './pages/ManageCategories/ManageCategories'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import Explore from './pages/Explore/Explore'
import Login from './pages/Login/Login'
import OrderHistory from './components/OrderHistory/OrderHistory'
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  const location = useLocation()
  const { auth } = useContext(AppContext)
  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  }

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }
console.log("hiii",element,allowedRoles,auth);

    return element;
  }
  return (
    <div>
      {location.pathname !== "/login" ? <MenuBar /> : <Login />}

      <Routes>
    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="/explore" element={<Explore />} />
    
    {/* Admin only routes */}
   <Route path="/category" element={<ManageCategories />} />
<Route path="/users" element={<ManageUsers />} />
<Route path="/items" element={<ManageItems />} />
    
    <Route path="/login" element={<LoginRoute element={<Login />} />} />
    <Route path="/orders" element={<OrderHistory />} />
    <Route path="/" element={<DashBoard />} />
     <Route path="*" element={<NotFound />} />
</Routes>

    </div>
  )
}

export default App
