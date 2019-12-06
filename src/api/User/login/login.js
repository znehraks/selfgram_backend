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
                    throw Error("Wrong Password");
                }
            }else{
                throw Error("Email don't exist");
            }
        }
    }
}