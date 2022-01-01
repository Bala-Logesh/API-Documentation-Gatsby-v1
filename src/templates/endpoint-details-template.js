import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import { useState } from "react"

const EndPointDetail = ({ data: inputData }) => {
  let data = inputData.allRequests.edges[0].node

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
        to={`/endpoints/${data.app}/${data.endpoint_id}`}
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
          <div
            className={`flex-jcsb mb10px ${
              data.body === "" ? "hide" : "show"
            } `}
          >
            <p className="white-title">Request:</p>
            <button
              className="btn btn-2 pointer"
              onClick={() => copyData(data.body, true)}
            >
              {isCopiedReq ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className={`newlines code_block ${
              data.body === "" ? "hide" : "show"
            } `}
            dangerouslySetInnerHTML={{ __html: data.body }}
          ></div>
          <div
            className={`flex-jcsb mb10px ${
              data.response[0] === "" ? "hide" : "show"
            } `}
          >
            <p className="white-title">Possible Responses:</p>
            <button
              className="btn btn-2 pointer"
              onClick={() => copyData(data.response, false)}
            >
              {isCopiedRes ? "Copied" : "Copy"}
            </button>
          </div>
          <div
            className={`newlines code_block ${
              data.response[0] === "" ? "hide" : "show"
            } `}
            dangerouslySetInnerHTML={{ __html: data.response }}
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export default EndPointDetail

export const query = graphql`
  query getAllEndPointsDetailsQuery(
    $app: String!
    $endpoint_id: String!
    $slug: String!
  ) {
    allRequests(
      filter: {
        app: { eq: $app }
        endpoint_id: { eq: $endpoint_id }
        slug: { eq: $slug }
      }
    ) {
      edges {
        node {
          endpoint_id
          app
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
`
