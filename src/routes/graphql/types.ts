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
  getProfilesMemberTypeResolver,
  getSubscribedToUserResolver,
  getUserPostsResolver,
  getUserSubscribedToResolver,
  getUsersProfileResolver,
} from './resolvers.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
  }),
});

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});

export const profileTypeFields = {
  id: { type: new GraphQLNonNull(GraphQLString) },
  isMale: {
    type: GraphQLBoolean,
  },
  yearOfBirth: {
    type: GraphQLInt,
  },
  memberType: {
    type: memberTypeType,
    resolve: async (source) => await getProfilesMemberTypeResolver(source),
  },
};

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({ ...profileTypeFields }),
});

export const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({ ...userFields }),
});

export const userSubscribedToType = new GraphQLObjectType({
  name: 'userSubscribedToType',
  fields: () => ({
    ...userFields,
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (source) => await getSubscribedToUserResolver(source),
    },
  }),
});

export const subscribedToUserType = new GraphQLObjectType({
  name: 'subscribedToUserType',
  fields: () => ({
    ...userFields,
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (source) => await getUserSubscribedToResolver(source),
    },
  }),
});

export const userFields = {
  id: { type: new GraphQLNonNull(GraphQLString) },
  name: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  },
  profile: {
    type: profileType,
    resolve: async (source) => await getUsersProfileResolver(source),
  },
  posts: {
    type: new GraphQLList(postType),
    resolve: async (source) => await getUserPostsResolver(source),
  },
  userSubscribedTo: {
    type: new GraphQLList(userSubscribedToType),
    resolve: async (source) => await getUserSubscribedToResolver(source),
  },
  subscribedToUser: {
    type: new GraphQLList(subscribedToUserType),
    resolve: async (source) => await getSubscribedToUserResolver(source),
  },
};
