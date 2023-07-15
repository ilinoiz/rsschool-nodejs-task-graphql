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
