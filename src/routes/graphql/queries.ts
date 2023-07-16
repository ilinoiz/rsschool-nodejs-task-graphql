import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import {
  memberTypeType,
  postType,
  profileType,
  profileTypeFields,
  userFields,
  userType,
} from './types.js';
import { UUIDType } from './types/uuid.js';
import MemberTypeId from './types/memberTypeId.js';
import { getMemberTypeByIdResolver, getMemberTypesResolver, getPostByIdResolver, getPostsResolver, getProfileByIdResolver, getProfilesResolver, getUserByIdResolver, getUsersResolver } from './rootResolvers.js';

const allQueryFields = {
  users: {
    type: new GraphQLList(userType),
    resolve: async () => await getUsersResolver(),
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async () => await getPostsResolver(),
  },
  memberTypes: {
    type: new GraphQLList(memberTypeType),
    resolve: async () => await getMemberTypesResolver(),
  },
  profiles: {
    type: new GraphQLList(profileType),
    resolve: async () => await getProfilesResolver(),
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
    resolve: async (_source, args) => await getUserByIdResolver(args),
  },
  post: {
    type: postType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await getPostByIdResolver(args),
  },
  memberType: {
    type: memberTypeType,
    args: {
      id: {
        type: new GraphQLNonNull(MemberTypeId),
      },
    },
    resolve: async (_source, args) => await getMemberTypeByIdResolver(args),
  },
  profile: {
    type: profileType,
    args: {
      id: {
        type: new GraphQLNonNull(UUIDType),
      },
    },
    resolve: async (_source, args) => await getProfileByIdResolver(args),
  },
};

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({ ...allQueryFields, ...getByIdQueryFields }),
});
