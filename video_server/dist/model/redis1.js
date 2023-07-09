"use strict";
const redis = require("redis");
const client = redis.createClient("redis://127.0.0.1:6379");
client.connect();
client.set("playlist87", "test");
