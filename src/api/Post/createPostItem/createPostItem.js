import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createPostItem: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {user} = request;
      const { location = "", caption = "", files} = args;
      const post = await prisma.createPost({
        location,
        caption,
        user: { connect: { id: user.id } },
        files: files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      )
    });
      return post;
    }
  }
};
