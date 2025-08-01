import { ValidationError } from 'yup';
import { NextResponse } from 'next/server';
import { ErrorHTTPResponse } from '@/types/response';

export class HTTPError extends Error {
  private readonly _status: number;

  constructor(message: string, status: number) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

export class BadRequestError extends HTTPError {
  private readonly _errors?: string[];

  constructor(message: string = 'Bad request.', errors?: string[]) {
    super(message, 400);

    this._errors = errors;
  }

  public get errors() {
    return this._errors;
  }
}

export class InternalError extends HTTPError {
  constructor(message: string = 'An internal error occurred.') {
    super(message, 500);
  }
}

type HandlerOptions = {
  validationMessage?: string;
};

export default class ErrorHandler {
  constructor() {}

  public static handle(error: unknown, options: HandlerOptions) {
    if (error instanceof ValidationError) {
      return new BadRequestError(
        options.validationMessage || error.message,
        error.errors,
      );
    } else if (error instanceof Error) {
      return new InternalError(error.message);
    } else {
      return new InternalError();
    }
  }

  public static respond(error: unknown, options: HandlerOptions) {
    const handledError = this.handle(error, options);

    const body: ErrorHTTPResponse = {
      success: false,
      message: handledError.message,
    };

    if (handledError instanceof BadRequestError) {
      body.errors = handledError.errors;
    }

    return NextResponse.json(body, {
      status: handledError.status,
    });
  }
}
