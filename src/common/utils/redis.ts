// redisClient.ts
import Redis from 'ioredis';

import { logger } from '@src/server';

import { getRedisPw, getRedisUrl } from './envConfig';

const redisClient = new Redis({
  host: getRedisUrl(), // Redis server host, change if your Redis server is not running locally
  port: 6379, // Redis server port
  password: getRedisPw(), // Redis password, if you've set one
  // additional options if needed
});

redisClient.on('connect', () => logger.info('Connected to Redis'));
redisClient.on('error', (err) => logger.error('Redis Client Error', err));

// Function to test the connection
const testConnection = async () => {
  try {
    const pong = await redisClient.ping();
    logger.info('🚀 ~ testConnection ~ pong:', pong); // Should log "PONG" if the connection is successful
  } catch (error) {
    console.error('Redis connection test failed:', error);
  }
};

// Optionally, call testConnection here or export it to be called elsewhere
testConnection();

export default redisClient;
