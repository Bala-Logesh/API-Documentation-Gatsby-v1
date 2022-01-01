import React from "react"
import { Link } from "gatsby"

const EndPoint = ({ ep, isSlugReq }) => {
  return (
    <Link
      to={isSlugReq ? `${ep.slug}/${ep.endpoint_id}` : `${ep.endpoint_id}`}
      className="card grid link"
    >
      <div className="card-body">
        <p className="card-title purple">{ep.application}</p>
        <p className="card-title-2 red">{ep.base_url}</p>
        <p className="white-title">{ep.description}</p>
      </div>
      <div className="card-footer flex">
        <span className="circular-number">{ep.count}</span>
        <p>{ep.count === 1 ? "Request" : "Requests"}</p>
      </div>
    </Link>
  )
}

export default EndPoint
