import redis from "redis";

export const redisConnection = () => {
    const client = redis.createClient();
    client.on("error", (error) => {
        console.log(error);
    });
    return client;
}