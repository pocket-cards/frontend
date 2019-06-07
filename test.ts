import express from 'express';
import https from 'https';
import * as fs from 'fs';

const app = express();

app.use(express.static('public'));

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
const opt: https.ServerOptions = {
  key: fs.readFileSync('./configs/certs/server_key.pem'),
  cert: fs.readFileSync('./configs/certs/server_crt.pem'),
};

https.createServer(opt, app).listen(443);
