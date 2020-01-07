import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      const user = await prisma.user({ email });
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (user) {
        if (passwordMatch) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              isLogin: true
            }
          });
          return generateToken(user.id);
        } else {
          console.log("wrong password");
          return 0;
        }
      } else if(user === undefined){
        
        console.log("account don't exist");
        return -1;
      }
    }
  }
};
