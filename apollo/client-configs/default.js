import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
const token = localStorage.getItem('token');

export default (ctx) => {
  const httpLink = new HttpLink({ uri: 'https://dev-api.hexabase.com/graphql' })

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { authorization: token ? `Bearer ${token}` : null }
    })
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
