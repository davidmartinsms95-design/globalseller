import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt' as const,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
      }

      return token
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  },
}
