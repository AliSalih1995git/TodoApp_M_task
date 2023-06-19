const Redis = require("redis");

// Create Redis client
const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("::> Redis Client Connected"));
redisClient.on("error", (err) => console.log("<:: Redis Client Error", err));

module.exports = { client: redisClient };
