// import { PrismaClient } from "@prisma/client";

import DataLoader from 'dataloader';
import {
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { userType } from './types.js';
import { GraphQLResolveInfo } from 'graphql';
// export const testprisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// });
// export let counter = { QUERY_COUNTER: 1 };
// testprisma.$on('query', (e) => {
//    console.log('Query: ' + e.query);
//    console.log('Params: ' + e.params);
//    console.log('Duration: ' + e.duration + 'ms');
//    console.log(counter.QUERY_COUNTER++);
// });

// const batchGetUsers = async (): Promise<Array<any>> => {
//   const users = await prisma.user.findMany();
//   usersDataLoader.prime('ALL', users);

//   // const result = await Promise.all(
//   //   userIds.map(async (userId) => {
//   //     const targetProfile = userProfiles.find((profile) => profile.userId === userId);
//   //     return targetProfile ?? null;
//   //   }),
//   // );

//   return users;
// };
export const usersDataLoader = new DataLoader((keys) => {
  return Promise.all(
    keys.map((key) => {
      Promise.resolve();
    }),
  );
});
export const getUsersResolver = async ({ prisma }, resolveInfo: GraphQLResolveInfo) => {
  const parsedResolveInfoFragment = parseResolveInfo(resolveInfo) as any;
  // if (!parsedResolveInfoFragment) {
  //   return;
  // }
  const { fields } = simplifyParsedResolveInfoFragmentWithType(
    parsedResolveInfoFragment,
    userType,
  ) as any;
  const subQuery = {
    include: {
      // userSubscribedTo: true,
      // subscribedToUser: true,
    },
  } as any;
  if (fields.userSubscribedTo) {
    subQuery.include.userSubscribedTo = true;
  }
  if (fields.subscribedToUser) {
    subQuery.include.subscribedToUser = true;
  }
  const result = await prisma.user.findMany({ ...subQuery });
  if (fields.subscribedToUser || fields.subscribedToUser) {
    usersDataLoader.prime('ALL', result);
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
