import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB } from '@/lib/connectDB';
import { User } from '@/models/User';
import client from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@website.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (typeof credentials?.email === 'undefined') return null;

        await connectDB();

        return User.findOne({
          email: credentials.email,
        });
      },
    }),
    GithubProvider({ clientId: '', clientSecret: '' }),
  ],
};
