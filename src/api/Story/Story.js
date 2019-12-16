import { prisma } from "../../../generated/prisma-client";

export default {
    Story: {
        user: ({id}) => prisma.story({id}).user(),
        files: ({id}) => prisma.story({id}).files()
    }
}