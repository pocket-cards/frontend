import webpack from 'webpack';
import express from 'express';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpackConfig from './webpack/webpack.dev';
import https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const compiler = webpack(webpackConfig);
const app = express();

app.use(dev(compiler));
app.use(hot(compiler));
app.use(express.static('public'));

app.use('*', (req, res, next) => {
  const fileName = path.join(compiler.outputPath, 'index.html');

  console.log(fileName);
  compiler.inputFileSystem.readFile(fileName, (err, contents) => {
    if (err) {
      next(err);
      return;
    }
    res.set('content-type', 'text/html');
    res.send(contents);
    res.end();
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
// const opt: https.ServerOptions = {
//   key: fs.readFileSync('./configs/certs/server_key.pem'),
//   cert: fs.readFileSync('./configs/certs/server_crt.pem'),
// };

// https.createServer(opt, app).listen(443);
