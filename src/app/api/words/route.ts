'use server';
import { NextRequest, NextResponse } from 'next/server';
import ErrorHandler from '@/lib/error-handler';
import authenticateUser from '@/request/middleware/authenticate-user';
import { wordSearchRequestValidator } from '@/request/validators/word-search-request-validator';
import { ActionLogService, WordService } from '@/services';

export async function GET(req: NextRequest) {
  let user, params;

  try {
    // Authentication
    user = await authenticateUser(req);

    // Validation
    params = await wordSearchRequestValidator(req);

    // Get or generate word
    const generationStart = Date.now();
    const result = await WordService.getOrGenerateWord(params);

    // Create an array of promises with the WORD_SEARCHED action
    const logPromises: Promise<void>[] = [
      ActionLogService.logWordSearched(
        user.id,
        params.word,
        params.language,
        params.translation_language,
        true,
      ),
    ];

    // Log WORD_GENERATED action if the word was generated
    if (result.wasGenerated) {
      const generationEnd = Date.now();
      const generationTimeInSeconds = (generationEnd - generationStart) / 1000;

      // Add WORD_GENERATED action log
      logPromises.push(
        ActionLogService.logWordGenerated(
          user.id,
          params.word,
          params.language,
          params.translation_language,
          generationTimeInSeconds,
          result.usage,
        ),
      );
    }

    await Promise.all(logPromises);

    return NextResponse.json(
      { success: true, word: result.word },
      {
        status: result.wasGenerated ? 201 : 200,
      },
    );
  } catch (error: unknown) {
    if (user) {
      await ActionLogService.logWordSearched(
        user.id,
        req.nextUrl.searchParams.get('word') || '',
        req.nextUrl.searchParams.get('language') || '',
        req.nextUrl.searchParams.get('translation_language') || '',
        false,
      );
    }

    return ErrorHandler.respond(error, {
      validationMessage: 'Could not validate provided word information.',
    });
  }
}
