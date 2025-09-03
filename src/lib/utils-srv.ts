import 'server-only';
import path from 'node:path';

export function buildPublicUrl(filePath: string): string {
  // Normalize to absolute and use forward slashes
  const normalized = path.resolve(filePath).replace(/\\/g, '/');

  // Find the "public" folder
  const idx = normalized.lastIndexOf('/public/');
  if (idx === -1) {
    throw new Error("File path must contain 'public/'");
  }

  // Strip everything before "public"
  return normalized.slice(idx + '/public'.length);
}
