import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const getUsersResolver = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const getMemberTypesResolver = async () => {
  const result = await prisma.memberType.findMany();
  return result;
};

export const getProfilesResolver = async () => {
  const result = await prisma.profile.findMany();
  return result;
};

export const getPostsResolver = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const getUserByIdResolver = async ({ id }) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const getMemberTypeByIdResolver = async ({ id }) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });
  return memberType;
};

export const getProfileByIdResolver = async ({ id }) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id,
    },
  });
  return profile;
};

export const getPostByIdResolver = async ({ id }) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
};
