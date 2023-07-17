import { prisma } from '../rootResolvers.js';

export const createPost = async ({ dto }) => {
  const result = await prisma.post.create({
    data: dto,
  });

  return result;
};

export const createUser = async ({ dto }) => {
  const result = await prisma.user.create({
    data: dto,
  });

  return result;
};

export const createProfile = async ({ dto }) => {
  const result = await prisma.profile.create({
    data: dto,
  });

  return result;
};

export const deletePost = async ({ id }) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return !!result;
};

export const deleteUser = async ({ id }) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return !!result;
};

export const deleteProfile = async ({ id }) => {
  const result = await prisma.profile.delete({
    where: {
      id,
    },
  });

  return !!result;
};

export const changePost = async ({ dto, id }) => {
  const result = await prisma.post.update({
    where: { id },
    data: dto,
  });

  return result;
};

export const changeUser = async ({ dto, id }) => {
  const result = await prisma.user.update({
    where: { id },
    data: dto,
  });

  return result;
};

export const changeProfile = async ({ dto, id }) => {
  const result = await prisma.profile.update({
    where: { id },
    data: dto,
  });

  return result;
};

export const subscribeToResolver = async ({ userId, authorId }) => {
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId,
        },
      },
    },
  });
  return result;
};

export const unsubscribeFromResolver = async ({ userId, authorId }) => {
  const result = await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId,
      },
    },
  });
  return !!result;
};
