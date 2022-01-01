import React from "react"
import { Link, graphql } from "gatsby"
import EndPoint from "../components/EndPoint"
import Layout from "../components/Layout"

const endpoints = ({ data }) => {
  let endpoint = data.allEndpoints.edges

  return (
    <Layout>
      <Link className="btn btn-2" to="/applications">
        Back
      </Link>
      <div className="container flex">
        {endpoint.map(ep => (
          <EndPoint key={ep.node.id} ep={ep.node} isSlugReq={true} />
        ))}
      </div>
    </Layout>
  )
}

export default endpoints

export const query = graphql`
  query getAllEndpointsQuery {
    allEndpoints {
      edges {
        node {
          count
          description
          application
          id
          base_url
          slug
          endpoint_id
        }
      }
    }
  }
`
