// // lib/aws.ts
// import AWS from 'aws-sdk';

// // Configure the AWS SDK to use LocalStack for S3
// const isLocal = process.env.NODE_ENV === 'development';

// const s3Config: AWS.S3.Types.ClientConfiguration = {
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test', // LocalStack default
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test', // LocalStack default
//   region: 'us-east-1', // Must match LocalStack's region for S3
//   endpoint: isLocal ? 'http://localhost:4566' : undefined, // LocalStack endpoint
//   s3ForcePathStyle: true, // Needed for LocalStack
// };

// export const s3 = new AWS.S3(s3Config);
// export const bucketName = process.env.AWS_BUCKET_NAME as string;
