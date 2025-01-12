import redisClient, { redisInstance } from '../../../src/common/utils/redis';

beforeEach(() => {
  jest.resetModules();
});

afterEach(async () => {
  await redisInstance.flushall();
});

describe('Redis', () => {
  it('should set value', async () => {
    const val = 'PONG';
    await redisClient.setValues('test', val);
    const value = await redisClient.getValues('test');
    expect(value).toBe(val);
  });

  it('should delete value', async () => {
    const val = 'PONG';
    await redisClient.setValues('test', val);
    await redisClient.deleteValues('test');
    const value = await redisClient.getValues('test');
    expect(value).toBeNull();
  });
});
