import React from "react"
import { Link, graphql } from "gatsby"
import Application from "../components/Application"
import Layout from "../components/Layout"

const applications = ({ data }) => {
  const application = data.allJson.edges

  return (
    <Layout>
      <Link className="btn btn-2" to="/">
        Back
      </Link>
      <div className="container flex-column">
        {application.map((node, index) => (
          <Application key={index} application={node.node} />
        ))}
      </div>
    </Layout>
  )
}

export default applications

export const query = graphql`
  query getAllApplicationsQuery {
    allJson {
      edges {
        node {
          application
          author
          slug
          id
          endpoints {
            endpoint_id
            url
          }
        }
      }
    }
  }
`
