export const env = {
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET!,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_REGION: process.env.AWS_REGION!,
  BUCKET_NAME: process.env.BUCKET_NAME!,
};
