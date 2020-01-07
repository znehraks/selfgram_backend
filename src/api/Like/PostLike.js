import { prisma } from "../../../generated/prisma-client";

export default {
  PostLike: {
    post: ({ id }) => prisma.postLike({ id }).post(),
    user: ({ id }) => prisma.postLike({ id }).user()
  }
};
