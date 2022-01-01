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

const EndPointRequestTemplate = ({ data: query }) => {
  console.log(query)
  const request = query.allEndpoints.edges[0].node
  const data = query.allRequests.edges

  return (
    <Layout>
      <Link className="btn btn-2" to={`/endpoints/${request.slug}`}>
        Back
      </Link>
      <div className="container flex">
        {data.map(node => (
          <Link
            key={node.node.slug}
            to={`${node.node.slug}`}
            className={`card link-no-hover ${getClass(node.node.method)}`}
          >
            <p className="card-title">
              {node.node.method} : <span className="pink">{node.node.url}</span>
            </p>
            <p className="white-title">{node.node.description}</p>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default EndPointRequestTemplate

export const query = graphql`
  query getEndPointRequestQuery($slug: String!, $endpoint_id: String!) {
    allEndpoints(filter: { endpoint_id: { eq: $endpoint_id } }) {
      edges {
        node {
          slug
        }
      }
    }
    allRequests(
      filter: { app: { eq: $slug }, endpoint_id: { eq: $endpoint_id } }
    ) {
      edges {
        node {
          app
          endpoint_id
          description
          method
          slug
          url
        }
      }
    }
  }
`
