import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        removeComment: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {commentId} = args;
            const {user} = request;
            const selectedComment = await prisma.comment({id: commentId});
            if(selectedComment && selectedComment.id === commentId){
                await prisma.deleteComment({id: commentId});
                return true;
            }else{
                throw Error("Can't delete");
            }
        }
    }
}