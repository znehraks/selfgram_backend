import { prisma } from "../../../../generated/prisma-client";
import { post } from "popsicle";

export default {
  Mutation: {
    togglePostLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.postLike(filterOptions);
        if (existingLike) {
          await prisma.deleteManyPostLikes(filterOptions);
        } else {
          await prisma.createPostLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
