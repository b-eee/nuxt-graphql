import {
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink,
} from "@apollo/client/core";

export default function (context) {
const token = localStorage.getItem('token');
const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: "https://hxb-graph.hexabase.com/graphql" })
]);

return {
  link: additiveLink,
  cache: new InMemoryCache(),
  defaultHttpLink: false,
};
}
