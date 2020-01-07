import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    logout: async (_, args) => {
      const { userName } = args;
      const user = await prisma.user({ userName });

      if (user) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            isLogin: false
          }
        });
        return true;
      } else if (user === undefined) {
        console.log("account don't exist");
        return false;
      }
    }
  }
};
