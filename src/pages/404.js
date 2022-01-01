import React from "react"
import Layout from "../components/Layout"

export default function ErrorPage() {
  return (
    <Layout>
      <div className="home-container flex">
        <h1 className="aqua">Oops!</h1>
        <h2>404 Error! Page not found</h2>
      </div>
    </Layout>
  )
}
