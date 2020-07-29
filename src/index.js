import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const filterId = 0;

export const filterIdVar = makeVar(
  filterId
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filterId: {
          read() {
            return filterIdVar();
          }
        },
        people: {
          merge (existing, incoming) {
            return existing ? [...existing, ...incoming] : incoming;
          },
          // When I don't provide read then it doesn't get the data in merge function. 
          // However when I define read this time when filter type changes nothing is happening.
          // read(existing) {
          //   return existing;
          // }
        }
      }
    }
  }
})

const client = new ApolloClient({
  cache,
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
