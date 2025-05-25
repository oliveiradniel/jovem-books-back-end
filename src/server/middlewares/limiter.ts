import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Number of requests exceeded, please try again later',
  keyGenerator: request => {
    const key = request.metadata.userId || (request.ip as string);
    return key;
  },
});
