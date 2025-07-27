import { connectDB } from '@/lib/connectDB';
import { User } from '@/models/User';

export async function GET() {
  await connectDB();

  let user = await User.findOne({
    email: 'n3pixowe@gmail.com',
  });

  if (!user) {
    user = new User({
      firstName: 'M. Çağlar',
      lastName: 'TUFAN',
      email: 'n3pixowe@gmail.com',
      password: 'S5c797cav2abi.',
    });
    await user.save();
  }

  return Response.json({
    success: true,
    user,
  });
}
