import { prisma } from "../../../generated/prisma-client";

export default {
  CommentLike: {
    post: ({ id }) => prisma.commentLike({ id }).post(),
    user: ({ id }) => prisma.commentLike({ id }).user(),
    comment: ({ id }) => prisma.commentLike({ id }).comment()
  }
};
