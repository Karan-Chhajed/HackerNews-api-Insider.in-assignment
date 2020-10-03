//Initializing redis client for using cache and data stores

const redis = require('redis')
REDIS_PORT = process.env.REDIS_PORT || 6379

const client = redis.createClient(REDIS_PORT, 'redis')
module.exports = client