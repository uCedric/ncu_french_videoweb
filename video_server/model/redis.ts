const redis = require("redis");

export const redisConnection =async (data:any) => {
    const client = redis.createClient();
    console.log(data[0][1]._id.toString());
    for(let i=0;i<data.length;i++){
        client.rpush("playlist1",data[i][1]._id.toString(),redis.print).then((result:any) => {
            console.log(`Item pushed to list "playlist1".`);
          })
          .catch((error:Error) => {
            console.error('Error:', error);
          })
          .finally(() => {
            client.quit();
          });
    }  
}
//const client = redis.createClient();
