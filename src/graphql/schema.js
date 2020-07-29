import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

const PAGE_SIZE = 3;

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    filterType: { type: GraphQLInt }
  },
});

const peopleData = [
  { id: 1, name: 'John Smith', filterType: 0 },
  { id: 2, name: 'Sara Smith' , filterType: 0},
  { id: 3, name: 'Budd Deey', filterType: 0 },
  { id: 4, name: 'John Kara', filterType: 0 },
  { id: 5, name: 'Sara Susan' , filterType: 0},
  { id: 6, name: 'Budd Cupon', filterType: 0 },
  { id: 7, name: 'Budd Light', filterType: 1 },
  { id: 8, name: 'Kurt Cobain', filterType: 1 },
  { id: 9, name: 'Danny Richardo', filterType: 1 },
  { id: 10, name: 'Max Richardo', filterType: 1 },
  { id: 11, name: 'Vettel Richardo', filterType: 1 },
  { id: 12, name: 'Junior Richardo', filterType: 1 },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      args: { 
        filterType: { type: GraphQLInt },
        pageNumber: { type: GraphQLInt }
      },
      type: new GraphQLList(PersonType),
      resolve: (parent, args, context, info) => {
        const paginator = PAGE_SIZE * args.pageNumber;
        return peopleData.filter(p => p.filterType === args.filterType).slice(paginator, paginator + PAGE_SIZE);
      }
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
