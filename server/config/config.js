const Redis = require("redis");

// Create Redis client
const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("::> Redis Client Connected"));
redisClient.on("error", (err) => console.log("<:: Redis Client Error", err));

// redisClient.on("connect", function () {
//   console.log("redis connected");
//   console.log(`connected `);
// });

// redisClient.on("error", (error) => {
//   console.error("Redis connection error:", error);
// });

module.exports = { client: redisClient };
