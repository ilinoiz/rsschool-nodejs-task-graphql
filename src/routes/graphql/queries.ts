import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { memberTypeType, postType, profileType, userType } from './types.js';
import { UUIDType } from './types/uuid.js';
import MemberTypeId from './types/memberTypeId.js';
import {
  getMemberTypeByIdResolver,
  getMemberTypesResolver,
  getPostByIdResolver,
  getPostsResolver,
  getProfileByIdResolver,
  getProfilesResolver,
  getUserByIdResolver,
  getUsersResolver,
} from './rootResolvers.js';

const allQueryFields = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_source, _args, context, resolveInfo) =>
      await getUsersResolver(context, resolveInfo),
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async (_source, _args, context) => await getPostsResolver(context),
  },
  memberTypes: {
    type: new GraphQLList(memberTypeType),
    resolve: async (_source, _args, context) => await getMemberTypesResolver(context),
  },
  profiles: {
    type: new GraphQLList(profileType),
    resolve: async (_source, _args, context) => await getProfilesResolver(context),
  },
};

const getByIdQueryFields = {
  user: {
    type: userType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args, context) => await getUserByIdResolver(args, context),
  },
  post: {
    type: postType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args, context) => await getPostByIdResolver(args, context),
  },
  memberType: {
    type: memberTypeType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeId),
      },
    },
    resolve: async (_source, args, context) =>
      await getMemberTypeByIdResolver(args, context),
  },
  profile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args, context) =>
      await getProfileByIdResolver(args, context),
  },
};

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({ ...allQueryFields, ...getByIdQueryFields }),
});
