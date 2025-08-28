import { NextRequest, NextResponse } from 'next/server';
import { ActionLogService } from '@/services';
import authenticateUser from '@/request/middleware/authenticate-user';
import ErrorHandler from '@/lib/error-handler';

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);

    const recentSearches = await ActionLogService.getRecentWordSearches(
      user._id.toString(),
      true,
      3,
    );

    return NextResponse.json({
      success: true,
      searches: recentSearches,
    });
  } catch (error: unknown) {
    return ErrorHandler.respond(error, {
      validationMessage: 'Could not retrieve recent searches.',
    });
  }
}
