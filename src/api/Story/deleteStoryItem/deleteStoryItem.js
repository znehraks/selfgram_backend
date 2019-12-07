import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
      deleteStoryItem: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { storyId } = args;
        const story = await prisma.story({ id: storyId });
        if (story) {
          await prisma.deleteStory({ id: storyId });
          return true;
        } else {
          throw Error("Can't delete");
        }
      }
    }
};
