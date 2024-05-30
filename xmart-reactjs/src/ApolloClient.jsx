import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8070/graphql/transaction', 
  cache: new InMemoryCache(),
});

export default client;
