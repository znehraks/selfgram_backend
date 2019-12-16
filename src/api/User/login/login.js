import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        login: async(_, args) => {
            const {email, password} = args;
            const user = await prisma.user({email});
            if(user){
                if(user.password === password){
                    await prisma.updateUser({
                        where: {id: user.id},
                        data: {
                            isLogin: true
                        }
                    });
                    return generateToken(user.id);
                }else{
                    console.log("wrong password");
                    return 0;
                }
            }else{
                console.log("account don't exist");
                return -1;
            }
        }
    }
}