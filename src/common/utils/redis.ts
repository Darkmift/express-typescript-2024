// redisClient.ts
import Redis from 'ioredis';

import { logger } from '@src/server';

import { getRedisPw, getRedisUrl } from './envConfig';

export const redisInstance = new Redis({
  host: getRedisUrl(), // Redis server host, change if your Redis server is not running locally
  port: 6379, // Redis server port
  password: getRedisPw(), // Redis password, if you've set one
  // additional options if needed
});

redisInstance.on('connect', () => logger.info('Connected to Redis'));
redisInstance.on('error', (err) => logger.error('Redis Client Error', err));

// Function to test the connection
const testConnection = async () => {
  try {
    const pong = await redisInstance.ping();
    logger.info('🚀 ~ testConnection ~ pong:', pong); // Should log "PONG" if the connection is successful
  } catch (error) {
    console.error('Redis connection test failed:', error);
  }
};

// Optionally, call testConnection here or export it to be called elsewhere
testConnection();

const setValues = async (key: string, value: string) => redisInstance.set(key, value);
const getValues = async (key: string) => redisInstance.get(key);
const deleteValues = async (key: string) => redisInstance.del(key);

const redisClient = {
  setValues,
  getValues,
  deleteValues,
};

export default redisClient;
