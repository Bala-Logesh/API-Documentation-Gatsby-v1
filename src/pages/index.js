import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const Home = () => {
  return (
    <Layout>
      <div className="home-container flex">
        <h1 className="aqua">API Documentation</h1>
        <h3>with the request, response and other details</h3>
        <Link className="btn" to="/applications">
          Go to the applications
        </Link>
      </div>
    </Layout>
  )
}

export default Home
