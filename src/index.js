import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar,
} from "@apollo/client";

import { link } from "./graphql/link";
import App from "./App";

import "./index.css";

const filterId = 0;

export const filterIdVar = makeVar(filterId);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filterId: {
          read() {
            return filterIdVar();
          },
        },
        people: {
          keyArgs: ['filterType'],
          merge(existing = [], incoming) {
            let mergedData = [];
            if (incoming) {
              const duplicateValues = incoming.filter((inc) =>
                existing.some((exs) => exs.__ref === inc.__ref)
              );
              const cleanedExisting = existing.filter(
                (exs) => !duplicateValues.some((dup) => dup.__ref === exs.__ref)
              );
              mergedData = [...cleanedExisting, ...incoming];
            }
            return existing ? mergedData : incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
