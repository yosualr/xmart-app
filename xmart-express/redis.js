const Redis = require('ioredis');

const redis = new Redis({
  host: 'localhost', 
  port: 6379, 
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redis;
