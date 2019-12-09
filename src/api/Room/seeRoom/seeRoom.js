import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeRoom: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {roomId} = args;
            return await prisma.room({id: roomId});
        }
    }
}