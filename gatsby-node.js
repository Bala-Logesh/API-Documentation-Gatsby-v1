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
            base_url
            slug
            methods {
              description
              method
              slug
            }
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
      allEndpoints {
        edges {
          node {
            endpoint_id
            base_url
            slug
            methods {
              slug
            }
          }
        }
      }
    }
  `)

  data2.allEndpoints.edges.forEach(node => {
    node.node.methods.forEach(method => {
      actions.createPage({
        path:
          "/endpoints/" +
          node.node.slug +
          "/" +
          node.node.endpoint_id +
          "/" +
          method.slug,
        component: path.resolve("./src/templates/endpoint-details-template.js"),
        context: {
          slug: node.node.slug,
          endpoint_id: node.node.endpoint_id,
          method_slug: method.slug,
        },
      })
    })
  })
}
