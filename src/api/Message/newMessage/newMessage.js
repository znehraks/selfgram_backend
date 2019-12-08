import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args, { request, isAuthenticated }) => {
        const { roomId } = args;
        return (
          prisma.$subscribe.message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          }),
          node()
        );
      },
      resolve: payload => payload
    }
  }
};
