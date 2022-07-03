import React from 'react'
import './Navbar.css'
import Logo from '../../assets/static/Logo-PP-fondo-turquesa.png'
import menu from '../../assets/static/menuIcon.png'

const Navbar = () => {
    return (
       <div className="navbar">
            <div className="nav-logo">
                <img src={Logo} alt="Logo"/>
            </div>
            <div className="nav-title">
                <h2>App</h2>
            </div>
            <div className="nav-menu">
                <img id="nav-menu" src={menu} alt="menu" />
            </div>
        </div>
    )
}

export default Navbar
