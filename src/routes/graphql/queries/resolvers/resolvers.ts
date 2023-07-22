import {
  memberTypesBatchLoader,
  postBatchLoader,
  profileBatchLoader,
  subscribedToUserLoader,
  userSubscribedToBatchLoader,
} from './batchResolvers.js';

export const getUsersProfileResolver = async (user) => {
  const userProfile = await profileBatchLoader.load(user.id);
  return userProfile;
};

export const getUserPostsResolver = async (user) => {
  const userPosts = await postBatchLoader.load(user.id);
  return userPosts;
};

export const getUserSubscribedToResolver = async (user) => {
  const userSubscribedToUsers = await userSubscribedToBatchLoader.load(user.id);
  return userSubscribedToUsers;
};

export const getSubscribedToUserResolver = async (user) => {
  const subscribedToUser = await subscribedToUserLoader.load(user.id);
  return subscribedToUser;
};
export const getProfilesMemberTypeResolver = async (source) => {
  const memberType = await memberTypesBatchLoader.load(source.memberTypeId);
  return memberType;
};
