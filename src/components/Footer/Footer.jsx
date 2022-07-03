import React, { useContext } from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
import homeIcon from '../../assets/static/homeIcon.png'
import inventoryIcon from '../../assets/static/inventoryIcon.png'
import exitIcon from '../../assets/static/exitIcon.png'
import { GlobalContext } from '../../Context/GlobalContext'

const Footer = () => {

  const { currentState } = useContext(GlobalContext)
  let homeRute = ""

  if (currentState.login) {
    homeRute = "/menu"
  }else{
    homeRute = "/"
  }

  return (
    <div className="footer">
      <div className="footer-home-icon">
        <NavLink exact to={homeRute}><img id="home-icon" src={homeIcon} alt="home-icon" /></NavLink>
      </div>
      <div className="footer-inventory-icon">
        <img id="inventory-icon" src={inventoryIcon} alt="inventory-icon" />
      </div>
      <div className="footer-exit-icon">
        <img id="exit-icon" src={exitIcon} alt="exit-icon" />
      </div>
    </div>
  )
}

export default Footer
