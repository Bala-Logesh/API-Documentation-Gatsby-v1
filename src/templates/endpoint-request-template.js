import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const getClass = method => {
  if (method === "GET") {
    return "get"
  } else if (method === "POST") {
    return "post"
  } else if (method === "PATCH") {
    return "patch"
  } else if (method === "PUT") {
    return "put"
  } else if (method === "DELETE") {
    return "del"
  }
}

const EndPointRequestTemplate = ({ data }) => {
  const request = data.allEndpoints.edges[0].node

  return (
    <Layout>
      <Link className="btn btn-2" to={`/endpoints/${request.slug}`}>
        Back
      </Link>
      <div className="container flex">
        {request.methods.map(req => (
          <Link
            key={req.slug}
            to={`${req.slug}`}
            className={`card link-no-hover ${getClass(req.method)}`}
          >
            <p className="card-title">
              {req.method} : <span className="pink">{request.base_url}</span>
            </p>
            <p className="white-title">{req.description}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default EndPointRequestTemplate

export const query = graphql`
  query getEndPointRequestQuery($slug: String!, $endpoint_id: String!) {
    allEndpoints(
      filter: { slug: { eq: $slug }, endpoint_id: { eq: $endpoint_id } }
    ) {
      edges {
        node {
          endpoint_id
          slug
          base_url
          methods {
            description
            method
            slug
          }
        }
      }
    }
  }
`
