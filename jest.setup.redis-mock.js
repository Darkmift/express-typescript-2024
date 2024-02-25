var IoRedis = require('ioredis-mock');
var ioRedis = new IoRedis();
jest.mock('ioredis', () => {
  return function () {
    return ioRedis;
  };
});
