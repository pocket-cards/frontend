import webpack from 'webpack';
import express from 'express';
// import * as path from 'path';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpackConfig from './webpack/webpack.dev';

const compiler = webpack(webpackConfig);
const app = express();

app.use(dev(compiler));
app.use(hot(compiler));
app.use(express.static('public'));

app.use('*', (req, res, next) => {
  // const fileName = path.join(compiler.outputPath, 'index.html');
  // compiler.outputFileSystem.readFile(fileName, (err, result) => {
  //   if (err) {+
  //     next(err);
  //     return;
  //   }
  //   res.set('content-type', 'text/html');
  //   res.send(result);
  //   res.end();
  // });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
