const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query createApplicationsQuery {
      allJson {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `)

  data.allJson.edges.forEach(node => {
    actions.createPage({
      path: "/endpoints/" + node.node.slug,
      component: path.resolve("./src/templates/endpoint-template.js"),
      context: { slug: node.node.slug },
    })
  })

  const { data: data1 } = await graphql(`
    query createApplicationEndPointsRequestsQuery {
      allEndpoints {
        edges {
          node {
            endpoint_id
            slug
          }
        }
      }
    }
  `)

  data1.allEndpoints.edges.forEach(node => {
    actions.createPage({
      path: "/endpoints/" + node.node.slug + "/" + node.node.endpoint_id,
      component: path.resolve("./src/templates/endpoint-request-template.js"),
      context: { slug: node.node.slug, endpoint_id: node.node.endpoint_id },
    })
  })

  const { data: data2 } = await graphql(`
    query createIndividualEndPointsRequestsQuery {
      allRequests {
        edges {
          node {
            slug
            endpoint_id
            app
          }
        }
      }
    }
  `)

  data2.allRequests.edges.forEach(node => {
    actions.createPage({
      path:
        "/endpoints/" +
        node.node.app +
        "/" +
        node.node.endpoint_id +
        "/" +
        node.node.slug,
      component: path.resolve("./src/templates/endpoint-details-template.js"),
      context: {
        app: node.node.app,
        endpoint_id: node.node.endpoint_id,
        slug: node.node.slug,
      },
    })
  })
}
