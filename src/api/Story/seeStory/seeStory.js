import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeStory: async (_, args) => {
      const { storyId } = args;
      return await prisma.story({ id: storyId });
    }
  }
};
