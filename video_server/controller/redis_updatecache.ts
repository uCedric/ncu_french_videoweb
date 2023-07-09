const redis = require("redis");

export const redisConnection =async (data:any) => {
    const url = "redis://127.0.0.1:6379"
    const client = redis.createClient(url);
    client.connect();
    for(let i=0;i<data.length;i++){
        client.hSet("playlist",data[i][1]._id.toString(),data[i][1].url);
    }
    client.quit();
}
//client.set("playlist1","seventeen");