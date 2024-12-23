import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/mongodb";
import userModel from "@/app/models/users/userModel";

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seuemail@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        console.log('CREDENCIAISSS:', credentials);
        const user = await userModel.findOne({ email: credentials?.email });
        
        console.log(user);
        
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Senha incorreta");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } else {
          throw new Error("Usuário não encontrado");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
