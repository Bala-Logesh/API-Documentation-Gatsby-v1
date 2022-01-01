import React from "react"
import { graphql, Link } from "gatsby"
import EndPoint from "../components/EndPoint"
import Layout from "../components/Layout"

const EndPointTemplate = ({ data }) => {
  const endpoint = data.allEndpoints.edges

  return (
    <Layout>
      <Link className="btn btn-2" to="/applications">
        Back
      </Link>
      <div className="container flex">
        {endpoint.map(ep => (
          <EndPoint key={ep.node.id} ep={ep.node} isSlugReq={false} />
        ))}
      </div>
    </Layout>
  )
}

export default EndPointTemplate

export const query = graphql`
  query getEndPointsOfApplicationQuery($slug: String!) {
    allEndpoints(filter: { slug: { eq: $slug } }) {
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
