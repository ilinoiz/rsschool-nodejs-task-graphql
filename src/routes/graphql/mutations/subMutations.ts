import { GraphQLBoolean } from 'graphql';
import { subscribeToResolver, unsubscribeFromResolver } from './mutationsResolvers.js';
import { UUIDType } from '../types/uuid.js';
import { userType } from '../types.js';

export const subMutationFields = {
  subscribeTo: {
    type: userType,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_source, args) => await subscribeToResolver(args),
  },
  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: UUIDType,
      },
      authorId: {
        type: UUIDType,
      },
    },
    resolve: async (_source, args) => await unsubscribeFromResolver(args),
  },
};
