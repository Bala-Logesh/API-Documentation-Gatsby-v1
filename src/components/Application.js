import React from "react"
import { Link } from "gatsby"

const Application = ({ application }) => {
  return (
    <div className="card grid no-pointer">
      <div className="card-body">
        <p className="red card-title">
          <Link className="link" to={`/endpoints/${application.slug}`}>
            {application.application}
          </Link>
        </p>
        <p>
          <i>Author&nbsp;:</i>{" "}
          <span className="aqua">{application.author}</span>
        </p>
        <p className="aqua">
          <i>List of API End Points</i>
        </p>
        <ul className="ml10px">
          {application.endpoints.map(endpoint => (
            <li key={endpoint.endpoint_id}>
              <Link
                className="link"
                to={`/endpoints/${application.slug}/${endpoint.endpoint_id}`}
              >
                {endpoint.url}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer flex">
        <span className="circular-number">{application.endpoints.length}</span>
        <p>
          {application.endpoints.length === 1
            ? "API Endpoint"
            : "API Endpoints"}
        </p>
      </div>
    </div>
  )
}

export default Application
