import { GraphQLObjectType } from 'graphql';
import { createMutationFields } from './createMutations.js';
import { deleteMutationFields } from './deleteMutations.js';
import { changeMutationFields } from './changeMutations.js';
import { subMutationFields } from './subMutations.js';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...createMutationFields,
    ...deleteMutationFields,
    ...changeMutationFields,
    ...subMutationFields,
  }),
});
