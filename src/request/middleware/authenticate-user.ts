import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UnauthorizedError } from '@/lib/error-handler';
import { connectDB } from '@/lib/connectDB';
import { User } from '@/models/User';

export default async function authenticateUser(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    throw new UnauthorizedError();
  }

  await connectDB();
  const user = await User.findById(token.sub);

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
}
