const dbName = _getEnv('MONGODB_DATABASE');

if (!dbName) {
  throw new Error('Environment variable MONGODB_DATABASE is not set.');
}

db = db.getSiblingDB(dbName);
// Database is created automatically when first accessed
