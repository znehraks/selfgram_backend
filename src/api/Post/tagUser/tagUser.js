import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    tagUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, postId } = args;
      const { id } = await prisma.post({ id: postId });
      const user = await prisma.user({ userName });
      if (user) {
        await prisma.updatePost({
          where: { id },
          data: { taggedUser: { connect: { userName } } }
        });
        return true;
      } else {
        throw Error("Can't tag");
      }
    }
  }
};
