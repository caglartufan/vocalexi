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

/**
 * Constructs and returns a fully qualified URL for accessing a DigitalOcean Space.
 *
 * @param {boolean} [isCDN] - Optional flag indicating whether to generate a CDN URL. If true, the endpoint is modified to use the CDN domain.
 * @return {string} The constructed URL for the bucket, optionally modified for CDN usage.
 */
export function getSpaceUrl(isCDN: boolean = true): string {
  const endpoint = process.env.DO_ENDPOINT!;
  const bucket = process.env.DO_BUCKET!;

  // strip protocol (https://) and join bucket + endpoint
  let endpointHost = endpoint.replace(/^https?:\/\//, '');
  if (isCDN) {
    endpointHost = endpointHost.replace(
      '.digitaloceanspaces.com',
      '.cdn.digitaloceanspaces.com',
    );
  }
  return `https://${bucket}.${endpointHost}`;
}

/**
 * Constructs a complete URL for a given file path within the space.
 *
 * @param {string} filePath - The file path relative to the base space URL.
 * @return {string} The full URL pointing to the specified file within the space.
 */
export function getSpaceFileUrl(filePath: string): string {
  const baseUrl = getSpaceUrl();

  // Ensure we don’t end up with double slashes
  return `${baseUrl}/${filePath.replace(/^\/+/, '')}`;
}
