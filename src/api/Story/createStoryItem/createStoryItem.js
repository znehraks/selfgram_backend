import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createStoryItem: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { files } = args;
      const story = await prisma.createStory({
        user: { connect: { id: user.id } }
      });
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            story: {
              connect: {
                id: story.id
              }
            }
          })
      );
      return story;
    }
  }
};
