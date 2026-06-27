const redis= require('redis');

const client= redis.createClient({
  url:process.env.REDIS_URL
})

client.on("connect", ()=>{
  console.log("redis connected");
})

client.on("error", (err)=>{
  console.log(err);
})

client.connect();

module.exports= client;