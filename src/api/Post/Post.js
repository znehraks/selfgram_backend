import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({id}) => prisma.post({id}).files(),
    comments: ({id}) => prisma.post({id}).comments(),
    user: ({id}) => prisma.post({id}).user(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.postLike({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent => 
      prisma
        .postLikesConnection({
          where: {post: {id: parent.id}}
        })
        .aggregate()
        .count(),

    commentCount: parent => 
      prisma
        .commentsConnection({
          where: {post: {id: parent.id}}
        })
        .aggregate()
        .count()    
  }
};