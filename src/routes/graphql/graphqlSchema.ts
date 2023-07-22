import { GraphQLSchema } from 'graphql';
import { memberTypeType, postType, profileType, userType } from './types.js';
import { queryType } from './queries/queryTypes.js';
import { mutationType } from './mutations/mutations.js';

export const RootSchema: GraphQLSchema = new GraphQLSchema({
  types: [userType, memberTypeType, postType, profileType],
  mutation: mutationType,
  query: queryType,
});
