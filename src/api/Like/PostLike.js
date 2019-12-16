import { prisma } from "../../../generated/prisma-client";

export default {
  PostLike: {
    post: ({ id }) => prisma.like({ id }).post(),
    user: ({ id }) => prisma.like({ id }).user()
  }
};
