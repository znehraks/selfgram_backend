import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleCommentLike: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { commentId } = args;
            const { user } = request;
            const filterOptions = {
              AND: [
                {
                  user: {
                    id: user.id
                  }
                },
                {
                  commentId: {
                    id: commentId
                  }
                }
              ]
            };
            try {
              const existingLike = await prisma.$exists.commentLike(filterOptions);
              if (existingLike) {
                await prisma.deleteManyCommentLikes(filterOptions);
              } else {
                await prisma.createCommentLike({
                  user: {
                    connect: {
                      id: user.id
                    }
                  },
                  comment: {
                    connect: {
                      id: commentId
                    }
                  }
                });
              }
              return true;
            } catch(e) {
              throw Error(e);
            }
          }
    }
}