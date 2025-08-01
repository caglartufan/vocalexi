import { connectDB } from '@/lib/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import {
  SignUpRequestBody,
  signUpRequestSchema,
} from '@/validation-schemas/sign-up';
import ErrorHandler from '@/lib/error-handler';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const res: SignUpRequestBody = await request.json();
    await signUpRequestSchema.validate(res, {
      abortEarly: false,
    });

    const existingUserWithEmail = await User.findOne({ email: res.email });

    if (existingUserWithEmail) {
      return NextResponse.json(
        {
          success: false,
          message: 'A user with provided email address already exists.',
        },
        { status: 400 },
      );
    }

    const user = new User({
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(res.password, salt);

    await user.save();

    return NextResponse.json(
      { success: true, user: user.toJSON() },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    return ErrorHandler.respond(error, {
      validationMessage: 'Could not validate provided user information.',
    });
  }
}
