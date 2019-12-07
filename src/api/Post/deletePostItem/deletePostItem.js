import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
      deletePostItem: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { postId } = args;
        const post = await prisma.post({ id: postId });
        if (post) {
          await prisma.deletePost({ id: postId });
          return true;
        } else {
          throw Error("Can't delete");
        }
      }
    }
};
