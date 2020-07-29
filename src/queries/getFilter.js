import { gql, useQuery } from '@apollo/client';

const GET_SELECTED_FILTER = gql`
  query GetSelectedFilter {
    filterId @client
  }
`;

const useFilter = () => {
  const { data } = useQuery(GET_SELECTED_FILTER);
  const { filterId } = data;
  return filterId;
};

export default useFilter;
