import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, password } = args;
      const user = await prisma.user({ userName });const passwordMatch = await bcrypt.compare(password, user.password);
      if (user) {
        if (passwordMatch) {
          try {
            await prisma.deleteUser({ userName: user.userName });
            return true;
          } catch (e) {
            console.log(e);
          }
        } else {
          return false;
        }
      } else {
        throw Error("email or password is incorrect!");
      }
    }
  }
};
