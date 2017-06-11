import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'cxx/graphql';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'Hello'
      },
      world: {
        type: GraphQLString,
        resolve: () => 'World'
      }
    }
  })
});
