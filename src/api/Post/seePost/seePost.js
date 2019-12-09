import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePost: async (_, args) => {
      const { postId } = args;
      return await prisma.post({ id: postId });
    }
  }
};
