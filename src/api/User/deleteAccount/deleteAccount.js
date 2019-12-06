import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { email, password } = args;
      const user = await prisma.user({ email });
      if (user) {
        if (user.password === password) {
          await prisma.deleteUser({email: user.email});
          return true;
        }
        return false;
      } else {
        throw Error("email or password is incorrect!");
      }
    }
  }
};
