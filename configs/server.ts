require('dotenv').config();

import webpack from 'webpack';
import express from 'express';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpackConfig from './webpack/webpack.dev';
import * as path from 'path';

const compiler = webpack(webpackConfig);
const app = express();

app.use(dev(compiler));
app.use(hot(compiler));
app.use(express.static('public'));

app.use('*', (req, res, next) => {
  const fileName = path.join(compiler.outputPath, 'index.html');

  compiler.inputFileSystem.readFile(fileName, (err, contents) => {
    if (err) {
      next(err);
      return;
    }
    res.set('content-type', 'gzip');
    res.send(contents);
    res.end();
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));

// (async () => {
//   const ngrok = require('ngrok');

//   const url = await ngrok.connect(3000);

//   console.log(url);
// })();
