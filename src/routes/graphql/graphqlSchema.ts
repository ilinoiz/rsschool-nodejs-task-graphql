// type User = {
//   id: !String;
//   name: String;
//   balance: Float;
// };

import { GraphQLSchema } from 'graphql';

import { memberTypeType, postType, profileType, userType } from './types.js';
import { queryType } from './queries.js';

export const RootSchema: GraphQLSchema = new GraphQLSchema({
  types: [userType, memberTypeType, postType, profileType],
  query: queryType,
});
