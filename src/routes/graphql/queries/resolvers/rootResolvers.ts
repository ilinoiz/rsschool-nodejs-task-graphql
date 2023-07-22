import DataLoader from 'dataloader';
import {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { GraphQLResolveInfo } from 'graphql';
import { userType } from '../../types.js';
import { ALL_USERS_CACHE_KEY } from './batchResolvers.js';

export const usersDataLoader = new DataLoader((keys) => {
  return Promise.all(
    keys.map((key) => {
      Promise.resolve();
    }),
  );
});
export const getUsersResolver = async ({ prisma }, resolveInfo: GraphQLResolveInfo) => {
  const parsedResolveInfoFragment = parseResolveInfo(resolveInfo) as any;
  const { fields } = simplifyParsedResolveInfoFragmentWithType(
    parsedResolveInfoFragment,
    userType,
  ) as any;
  const subQuery = {
    include: {},
  } as any;
  if (fields.userSubscribedTo) {
    subQuery.include.userSubscribedTo = true;
  }
  if (fields.subscribedToUser) {
    subQuery.include.subscribedToUser = true;
  }
  const result = await prisma.user.findMany({ ...subQuery });
  if (fields.subscribedToUser || fields.subscribedToUser) {
    usersDataLoader.prime(ALL_USERS_CACHE_KEY, result);
  }
  return result;
};

export const getMemberTypesResolver = async ({ prisma }) => {
  const result = await prisma.memberType.findMany();
  return result;
};

export const getProfilesResolver = async ({ prisma }) => {
  const result = await prisma.profile.findMany();
  return result;
};

export const getPostsResolver = async ({ prisma }) => {
  const result = await prisma.post.findMany();
  return result;
};

export const getUserByIdResolver = async ({ id }, { prisma }) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getMemberTypeByIdResolver = async ({ id }, { prisma }) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });
  return memberType;
};

export const getProfileByIdResolver = async ({ id }, { prisma }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });
  return profile;
};

export const getPostByIdResolver = async ({ id }, { prisma }) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};
