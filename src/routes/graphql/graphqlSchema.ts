// type User = {
//   id: !String;
//   name: String;
//   balance: Float;
// };

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
  getMemberTypesResolver,
  getPostsResolver,
  getProfilesResolver,
  getUsersResolver,
} from './resolvers.js';

const userType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
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
  }),
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    // author: {
    //   type: userType,
    // },
  }),
});

const memberTypeType = new GraphQLObjectType({
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

const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
  }),
});

export const RootSchema: GraphQLSchema = new GraphQLSchema({
  types: [userType, memberTypeType, postType, profileType],
  query: queryType,
});
