import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProviders({
      name: "sign up",
      credentials: {
        phone: { type: "text" },
        password: { type: "password" },
        email: { type: "text" },
        name: { type: "password" },
        login: { type: "text" },
        token: { type: "text" },
        id:{type: "text"}
      },
      async authorize(credentials, req) {
        if (!credentials?.phone) return null;
        let url: string = "";
        let body: {
          phone: string;
          password: string;
          email: string | null;
          name: string | null;
        } = {
          phone: "",
          password: "",
          email: "",
          name: "",
        };
        try {
          if (credentials?.login === "false") {
            url = `${process.env.NEXT_PUBLIC_URL_API}/user`;
            body.phone = credentials.phone;
            body.email = credentials?.email;
            body.name = credentials.name;
            body.password = credentials.password;
          } else {
            url = `${process.env.NEXT_PUBLIC_URL_API}/user/login`;
            body.phone = credentials.phone;
            body.email = credentials.email;
            body.password = credentials.password;
          }
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
          });
          const json = await res.json();
          if (!res.ok) {
            const error = new Error(json?.message);
            throw error;
          }
          return json?.data || null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };