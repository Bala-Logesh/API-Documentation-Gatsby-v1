import React from "react"
import { Link } from "gatsby"

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container flex-jcsb">
        <Link to="/" className="link">
          <h2>API Documentation</h2>
        </Link>
        <div className="links-container flex">
          <Link to="/applications" className="link-bb" activeClassName="active">
            <h3>Applications</h3>
          </Link>
          <Link to="/endpoints" className="link-bb" activeClassName="active">
            <h3>End Points</h3>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar