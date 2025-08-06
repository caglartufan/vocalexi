import { connectDB } from '@/lib/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import {
  getSignUpRequestSchema,
  SignUpRequestBody,
} from '@/validation-schemas/sign-up';
import ErrorHandler from '@/lib/error-handler';
import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import { getTranslations } from 'next-intl/server';

export async function POST(request: NextRequest) {
  const t = await getTranslations();
  const tAuthError = await getTranslations('Auth.error');

  try {
    await connectDB();

    const res: SignUpRequestBody = await request.json();
    const schema = getSignUpRequestSchema(t);
    await schema.validate(res, {
      abortEarly: false,
    });

    const existingUserWithEmail = await User.findOne({ email: res.email });

    if (existingUserWithEmail) {
      return NextResponse.json(
        {
          success: false,
          message: tAuthError('email_exists'),
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
      validationMessage: tAuthError('validation_failed'),
    });
  }
}
