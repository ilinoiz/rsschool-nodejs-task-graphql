import DataLoader from 'dataloader';
import { usersDataLoader } from './rootResolvers.js';
import { prisma } from '../../index.js';

export const ALL_USERS_CACHE_KEY = 'ALL_USERS';

const batchGetUserProfile = async (userIds): Promise<Array<any>> => {
  const userProfiles = await prisma.profile.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  const result = await Promise.all(
    userIds.map(async (userId) => {
      const targetProfile = userProfiles.find((profile) => profile.userId === userId);
      return targetProfile ?? null;
    }),
  );

  return result;
};

const batchGetUserPosts = async (userIds) => {
  const userPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: userIds,
      },
    },
  });

  const result = await Promise.all(
    userIds.map(async (userId) => {
      const posts = userPosts.filter((profile) => profile.authorId === userId);
      return posts;
    }),
  );

  return result;
};

const batchGetProfilesMemberType = async (memberTypeIds) => {
  const memberTypes = await prisma.memberType.findMany({
    where: {
      id: {
        in: memberTypeIds,
      },
    },
  });

  const result = await Promise.all(
    memberTypeIds.map((memberTypeId) => {
      const type = memberTypes.find((memberType) => memberType.id === memberTypeId);
      return type ?? null;
    }),
  );

  return result;
};

const batchGetSubscribedToUser = async (userIds) => {
  const usersFromCache = (await usersDataLoader.load(ALL_USERS_CACHE_KEY)) as any;
  if (usersFromCache?.length) {
    const result = await Promise.all(
      userIds.map((userId) => {
        return usersFromCache.filter(
          (user) =>
            user.userSubscribedTo?.some(
              (subscriber) => subscriber.subscriberId === userId,
            ),
        );
      }),
    );
    return result;
  }
  const userSubscribedToUsers = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: { in: userIds },
        },
      },
    },
    include: {
      userSubscribedTo: {
        where: {
          authorId: { in: userIds },
        },
      },
    },
  });
  const result = await Promise.all(
    userIds.map((userId) => {
      return userSubscribedToUsers.filter(
        (user) =>
          user.userSubscribedTo?.some((subscriber) => subscriber.authorId === userId),
      );
    }),
  );
  return result;
};

export const batchGetUserSubscribedTo = async (userIds) => {
  const usersFromCache = (await usersDataLoader.load(ALL_USERS_CACHE_KEY)) as any;
  if (usersFromCache?.length) {
    const result = await Promise.all(
      userIds.map((userId) => {
        return usersFromCache.filter((user) =>
          user.subscribedToUser.some((subscriber) => subscriber.authorId === userId),
        );
      }),
    );
    return result;
  }

  const subscribedToUser = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: { in: userIds },
        },
      },
    },
    include: {
      subscribedToUser: {
        where: {
          subscriberId: { in: userIds },
        },
      },
    },
  });
  const result = await Promise.all(
    userIds.map((userId) => {
      return subscribedToUser.filter((user) =>
        user.subscribedToUser.some((subscriber) => subscriber.subscriberId === userId),
      );
    }),
  );
  return result;
};

export const profileBatchLoader = new DataLoader((ids) => batchGetUserProfile(ids));
export const postBatchLoader = new DataLoader((ids) => batchGetUserPosts(ids));
export const memberTypesBatchLoader = new DataLoader((ids) =>
  batchGetProfilesMemberType(ids),
);
export const userSubscribedToBatchLoader = new DataLoader((ids) =>
  batchGetUserSubscribedTo(ids),
);

export const subscribedToUserLoader = new DataLoader((ids) =>
  batchGetSubscribedToUser(ids),
);
