import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

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

      const hashedPassword = await bcrypt.hash(password, 10)

      const exists = await prisma.$exists.user({
        OR: [{ userName }, { email }]
      });
      if(exists){
        throw Error("Already taken");
      }

      await prisma.createUser({
        userName,
        email,
        password: hashedPassword,
        bio,
        firstName,
        lastName
      });
      return true;
    }
  }
};
