import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { createPost, createUser, createProfile } from './mutationsResolvers.js';
import { postType, profileType, userType } from '../types.js';
import MemberTypeId from '../types/memberTypeId.js';

export const createPostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    authorId: {
      type: GraphQLString,
    },
  }),
});

export const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
    userId: { type: GraphQLString },
  }),
});

export const createMutationFields = {
  createPost: {
    type: postType,
    args: {
      dto: {
        type: new GraphQLNonNull(createPostInput),
      },
    },
    resolve: async (_source, args) => await createPost(args),
  },
  createUser: {
    type: userType,
    args: {
      dto: {
        type: new GraphQLNonNull(createUserInput),
      },
    },
    resolve: async (_source, args) => await createUser(args),
  },
  createProfile: {
    type: profileType,
    args: {
      dto: {
        type: new GraphQLNonNull(createProfileInput),
      },
    },
    resolve: async (_source, args) => await createProfile(args),
  },
};
