import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { password, firstName, lastName, bio } = args;
      const { user } = request;
      return prisma.updateUser({
        where: { userName: user.userName },
        data: { password, firstName, lastName, bio }
      });
    }
  }
};
