import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async(_, args) => {
      const {
        userName,
        email,
        password,
        bio = "",
        firstName = "",
        lastName = ""
      } = args;

      const exists = await prisma.$exists.user({
        OR: [{ userName }, { email }]
      });
      if(exists){
        throw Error("Already taken");
      }

      await prisma.createUser({
        userName,
        email,
        password,
        bio,
        firstName,
        lastName
      });
      return true;
    }
  }
};
