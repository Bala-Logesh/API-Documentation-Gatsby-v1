import React from "react"
import Navbar from "./Navbar"
import "../styles/global.css"
import "../styles/resets.css"
import "../styles/utilities.css"
import "../styles/layout.css"
import "../styles/card.css"
import "../styles/home.css"

const Layout = ({ children }) => {
  return (
    <div className="primary-container">
      <Navbar />
      <div className="main-container">{children}</div>
      <footer>
        API Documentation built using <span>Gatsby</span>
      </footer>
    </div>
  )
}

export default Layout

