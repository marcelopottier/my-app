import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/mongodb";

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
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Credenciais não fornecidas");
        }

        const { data: user, error } = await supabase
         .from("users")
         .select("*")
         .eq("email", email)
         .single();
        
        if (error || !user) {
          throw new Error("Usuário não encontrado");
        }
        
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
          if (!isPasswordValid) {
            throw new Error("Senha incorreta");
          }

          return {
            id: user.id,
            name: user.username,
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
