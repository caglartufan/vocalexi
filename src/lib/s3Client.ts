import 'server-only';
import { S3Client } from '@aws-sdk/client-s3';

const endpoint = process.env.DO_ENDPOINT;
const region = process.env.DO_REGION;
const bucketName = process.env.DO_BUCKET;
const accessKeyId = process.env.DO_ACCESS_KEY;
const secretAccessKey = process.env.DO_SECRET_KEY;

if (
  typeof endpoint === 'undefined' ||
  typeof region === 'undefined' ||
  typeof bucketName === 'undefined' ||
  typeof accessKeyId === 'undefined' ||
  typeof secretAccessKey === 'undefined'
) {
  console.error('Missing CDN environment variables:');
  console.table({
    DO_ENDPOINT: endpoint,
    DO_REGION: region,
    DO_BUCKET: bucketName,
    DO_ACCESS_KEY: accessKeyId,
    DO_SECRET_KEY: secretAccessKey,
  });
  process.exit(1);
}

export const s3Client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
