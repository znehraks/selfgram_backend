import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      let { term } = args;
      term = term.toLowerCase();
      console.log(term);
      return prisma.users({
        where: {
          OR: [
            { userName_contains: term },
            { firstName_contains: term },
            { lastName_contains: term }
          ]
        }
      });
    }
  }
};
