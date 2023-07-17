import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { deletePost, deleteUser, deleteProfile } from './mutationsResolvers.js';
import { UUIDType } from '../types/uuid.js';

export const deleteMutationFields = {
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deletePost(args),
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deleteUser(args),
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_source, args) => await deleteProfile(args),
  },
};
