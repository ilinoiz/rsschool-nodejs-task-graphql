import { prisma } from './rootResolvers.js';

export const getUsersProfileResolver = async (user) => {
  const userProfile = await prisma.profile.findUnique({ where: { userId: user.id } });

  return userProfile;
};

export const getUserPostsResolver = async (user) => {
  const userPosts = await prisma.post.findMany({ where: { authorId: user.id } });

  return userPosts;
};

export const getUserSubscribedToResolver = async (user) => {
  const userSubscribedToUsers = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: user.id,
        },
      },
    },
  });

  return userSubscribedToUsers;
};

export const getSubscribedToUserResolver = async (user) => {
  const subscribedToUser = prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: user.id,
        },
      },
    },
  });

  return subscribedToUser;
};
export const getProfilesMemberTypeResolver = async (source) => {
  const memberType = await prisma.memberType.findUnique({
    where: { id: source.memberTypeId },
  });
  return memberType;
};
