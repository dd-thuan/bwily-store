import React from 'react'
import "./PreNavbar.css"
import { Link } from "react-router-dom";

const PreNavbar = () => {
  return (
    <div className="preNav">
      <div className='preNavLeft'>
        <Link to="/" >
          <img src="" alt="logo" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>

      </div>

      <div className="preNavRight" >
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default PreNavbar