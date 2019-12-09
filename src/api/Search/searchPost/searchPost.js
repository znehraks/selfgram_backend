import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      let { term } = args;
      term = term.toLowerCase();
      return prisma.posts({
        where: {
          OR: [
            { location_contains: args.term },
            { caption_contains: args.term }
          ]
        }
      });
    }
  }
};
