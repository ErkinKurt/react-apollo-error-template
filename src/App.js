import React from "react";
import { gql, useQuery } from "@apollo/client";
import useFilter from "./queries/getFilter";
import { filterIdVar } from ".";

const ALL_PEOPLE = gql`
  query AllPeople($filterType: Int, $pageNumber: Int) {
    people(filterType: $filterType, pageNumber: $pageNumber){
      id
      name
    }
  }
`;

const PAGE_SIZE = 3;

export default function App() {

  const filterId = useFilter();
  console.log(filterId);
  const {
    loading,
    data,
    fetchMore
  } = useQuery(ALL_PEOPLE, {
    variables: {
      filterType: filterId,
      pageNumber: 0
    }
  });

  const onClick_0 = () => {
    filterIdVar(0);
  };

  const onClick_1 = () => {
    filterIdVar(1);
  };

  const loadMore = () => {
    fetchMore({
      variables: {
        pageNumber: data.people.length / PAGE_SIZE
      },
      //It is working as I expected when I use update query instead of merge.
      // updateQuery: (prev, { fetchMoreResult }) => {
      //   if (!fetchMoreResult) return prev;
      //   return { ...prev, people: [...prev.people, ...fetchMoreResult.people] };
      // }
    });
  }

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <button onClick={onClick_0}>Change Status Type: 0</button>
      <button onClick={onClick_1}>Change Status Type: 1</button>
      <button onClick={loadMore}>Load More</button>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul>
          {data.people.map(person => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
