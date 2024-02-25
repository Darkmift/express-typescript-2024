import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

const env = cleanEnv(
  process.env,
  {
    PORT: num(),
    CORS_ORIGIN: str(),
    NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
    MONGO_HOST: str(),
    MONGO_PORT: num(),
    MONGO_DB: str(),
    MONGO_USER: str(),
    MONGO_PASS: str(),
    REDIS_HOST: str(),
    REDIS_PORT: num(),
    REDIS_DB: num(),
    REDIS_PASS: str(),
  },
  {
    reporter: ({ errors, env }) => {
      if (Object.keys(errors).length < 1) return;
      console.error('Invalid environment variables:', errors);
      console.error('Current environment', env);
    },
  }
);

export const getPort = () => env.PORT;
export const getNodeEnv = () => env.NODE_ENV;
export const getCorsOrigin = () => env.CORS_ORIGIN;
// redis
export const getRedisUrl = () => env.REDIS_HOST;
export const getRedisPw = () => env.REDIS_PASS;
export const getRedisDbNum = () => env.REDIS_DB;
export const getRedisPort = () => env.REDIS_PORT;
// mongo
export const getMongoHost = () => env.MONGO_HOST;
export const getMongoPort = () => env.MONGO_PORT;
export const getMongoDb = () => env.MONGO_DB;
export const getMongoUser = () => env.MONGO_USER;
export const getMongoPass = () => env.MONGO_PASS;

export function getEnvVar<T extends string | number>(key: string, type: 'string' | 'number'): T {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Unknown process.env.${key}: ${value}. Is your .env file setup?`);
  }

  if (type === 'number') {
    const numValue = parseInt(value);
    if (Number.isNaN(numValue)) {
      throw new Error(`process.env.${key} must be a number. Got ${value}`);
    }
    return numValue as T;
  }

  return value as T;
}
