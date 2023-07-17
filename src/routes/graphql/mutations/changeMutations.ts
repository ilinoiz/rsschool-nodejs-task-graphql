import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { changeUser, changePost, changeProfile } from './mutationsResolvers.js';
import { postType, profileType, userType } from '../types.js';
import { UUIDType } from '../types/uuid.js';

export const changePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
  }),
});

export const changeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

export const changeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
  }),
});

export const changeMutationFields = {
  changePost: {
    type: postType,
    args: {
      dto: {
        type: new GraphQLNonNull(changePostInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changePost(args),
  },
  changeUser: {
    type: userType,
    args: {
      dto: {
        type: new GraphQLNonNull(changeUserInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changeUser(args),
  },
  changeProfile: {
    type: profileType,
    args: {
      dto: {
        type: new GraphQLNonNull(changeProfileInput),
      },
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await changeProfile(args),
  },
};
