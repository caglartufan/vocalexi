import { MongoClient } from 'mongodb';

export {};

declare global {
  // noinspection ES6ConvertVarToLetConst
  var mongoose:
      | {
          conn: typeof import('mongoose') | null;
          promise: Promise<typeof import('mongoose')> | null;
          _mongoClient?: MongoClient;
        }
      | undefined,
    _mongoClient: MongoClient = undefined;
}
