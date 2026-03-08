import React from 'react'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'



const MenuBar = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src={assets.BillingSoftwareLogo} alt="Logo" height="40" />
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/dashboard">
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/items">
              Manage Items
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Manage Users
            </Link>
          </li>
         
          <li className="nav-item">
            <Link className="nav-link" to="/category">

              Manage Categories
            </Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link" to="/history">
              Order History
            </Link>
          </li>



        </ul>




      </div>
      <div class="dropdown" style={{
        marginRight: "80px"
      }}>

        <img src={assets.profileLogo} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" width={30} />
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item" href="#">Settings</button>
          <button class="dropdown-item" href="#">Activity Logs</button>
          <hr></hr>
          <button class="dropdown-item" onClick={logOut}>Log Out</button>

        </div>
      </div>
    </nav>
  )
}

export default MenuBar
