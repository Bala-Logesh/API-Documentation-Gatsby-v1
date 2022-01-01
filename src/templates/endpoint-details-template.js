import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { useState } from "react"

const EndPointDetail = ({ data: inputData }) => {
  let node = inputData.allEndpoints.edges[0].node
  let data = node.methods[0]

  const [isCopiedReq, setIsCopiedReq] = useState(false)
  const [isCopiedRes, setIsCopiedRes] = useState(false)

  const copyData = (text, req) => {
    navigator.clipboard.writeText(text)
    req ? setIsCopiedReq(true) : setIsCopiedRes(true)
    setTimeout(() => {
      req ? setIsCopiedReq(false) : setIsCopiedRes(false)
    }, 2000)
  }

  return (
    <Layout>
      <Link
        className="btn btn-2"
        to={`/endpoints/${node.slug}/${node.endpoint_id}`}
      >
        Back
      </Link>
      <div className="container flex">
        <div className="w95p">
          <p className="white-title">Description:</p>
          <div className="code_block">{data.description}</div>
          <p className="white-title">Request URL:</p>
          <div className="code_block">{data.url}</div>
          <p className="white-title">Method:</p>
          <div className="code_block">{data.method}</div>
          <p className="white-title">Authorization:</p>
          <div className="code_block">{data.authorization}</div>
          <div className="flex-jcsb mb10px">
            <p className="white-title">Request:</p>
            <button
              className="btn btn-2 pointer"
              onClick={() => copyData(data.body, true)}
            >
              {isCopiedReq ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className="newlines code_block"
            dangerouslySetInnerHTML={{ __html: data.body }}
          ></div>
          <div className="flex-jcsb mb10px">
            <p className="white-title">Possible Responses:</p>
            <button
              className="btn btn-2 pointer"
              onClick={() => copyData(data.response, false)}
            >
              {isCopiedRes ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className="newlines code_block"
            dangerouslySetInnerHTML={{ __html: data.response }}
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export default EndPointDetail

export const query = graphql`
  query createEnpointsDetailsQuery(
    $slug: String!
    $endpoint_id: String!
    $method_slug: String!
  ) {
    allEndpoints(
      filter: {
        slug: { eq: $slug }
        endpoint_id: { eq: $endpoint_id }
        methods: { elemMatch: { slug: { eq: $method_slug } } }
      }
    ) {
      edges {
        node {
          endpoint_id
          slug
          methods {
            description
            method
            slug
            response
            url
            body
            authorization
          }
        }
      }
    }
  }
`
