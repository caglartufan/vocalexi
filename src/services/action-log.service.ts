import 'server-only';
import { connectDB } from '@/lib/connectDB';
import { ActionLog, ActionType } from '@/models/ActionLog';
import { ResponseUsage } from 'openai/resources/responses/responses';

export interface ActionLogPayload {
  userId: string;
  actionType: ActionType;
  payload: Record<string, unknown>;
}

export interface RecentWordSearch {
  word: string;
  language: string;
  translation_language: string;
  searchedAt: Date;
}

export class ActionLogService {
  static async logAction({
    userId,
    actionType,
    payload,
  }: ActionLogPayload): Promise<void> {
    await connectDB();
    await ActionLog.create({
      user: userId,
      actionType,
      payload,
    });
  }

  static async logWordSearched(
    userId: string,
    word: string,
    language: string,
    translationLanguage: string,
    isValid: boolean,
  ): Promise<void> {
    await this.logAction({
      userId,
      actionType: ActionType.WORD_SEARCHED,
      payload: {
        word,
        language,
        translation_language: translationLanguage,
        isValid,
      },
    });
  }

  static async logWordGenerated(
    userId: string,
    word: string,
    language: string,
    translationLanguage: string,
    generationTimeInSeconds: number,
    usage?: ResponseUsage,
  ): Promise<void> {
    const payload: Record<string, unknown> = {
      word,
      language,
      translation_language: translationLanguage,
      generationTimeInSeconds,
      usage,
    };

    await this.logAction({
      userId,
      actionType: ActionType.WORD_GENERATED,
      payload,
    });
  }

  static async logQuizTaken(
    userId: string,
    wordId: string,
    score: number,
    questionsAnswered: number,
  ): Promise<void> {
    await this.logAction({
      userId,
      actionType: ActionType.QUIZ_TAKEN,
      payload: {
        word_id: wordId,
        score,
        questions_answered: questionsAnswered,
      },
    });
  }

  static async logSignIn(
    userId: string,
    signInProvider?: string,
  ): Promise<void> {
    await this.logAction({
      userId,
      actionType: ActionType.SIGN_IN,
      payload: {
        signInProvider: signInProvider || 'credentials',
        timestamp: new Date(),
      },
    });
  }

  static async logSettingsChanged(
    userId: string,
    changedSettings: Record<string, unknown>,
  ): Promise<void> {
    await this.logAction({
      userId,
      actionType: ActionType.SETTINGS_CHANGED,
      payload: changedSettings,
    });
  }

  static async getRecentWordSearches(
    userId: string,
    isValid: boolean = false,
    limit: number = 3,
  ): Promise<RecentWordSearch[]> {
    await connectDB();

    const recentSearches = await ActionLog.find({
      user: userId,
      actionType: ActionType.WORD_SEARCHED,
      'payload.isValid': isValid,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return recentSearches.map((search) => ({
      word: search.payload.word as string,
      language: search.payload.language as string,
      translation_language: search.payload.translation_language as string,
      searchedAt: search.createdAt,
    }));
  }
}
