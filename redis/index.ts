const redis = require("redis");
import express from 'express';

import router from './router';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', router);
app.get('/', (req:express.Request, res:express.Response) => {
  console.log(req);
  res.send('Hello, World!!!!!!!!!!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});