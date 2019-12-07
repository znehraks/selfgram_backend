import { prisma } from "../../../../generated/prisma-client";
import { post } from "popsicle";

export default {
  Mutation: {
    toggleFollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { followId } = args;
      const { user } = request;
      try {
        const followingExist = await prisma.$exists.user({
          following_some: { id: followId }
        });
        if (!followingExist) {
            await prisma.updateUser({
                where: { id: user.id },
                data: { following: { connect: { id: followId } } }
              });
        } else {
            await prisma.updateUser({
                where: { id: user.id },
                data: { following: { disconnect: { id: followId } } }
              });
        }
        return true;
      } catch(e) {
        throw Error(e);
      }
    }
  }
};
