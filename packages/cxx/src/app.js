import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import renderer from './renderer';

class App {
  constructor(options = {}) {
    const { routes, schema } = options;
    this.routes = routes;
    this.schema = schema;
    this.options = options;
    this.renderer = renderer(routes, schema);
    this.init();
  }

  init() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    this.app = app;
  }

  use(...args) {
    this.app.use(...args);
  }
  get(...args) {
    this.app.get(...args);
  }
  post(...args) {
    this.app.post(...args);
  }

  start(options) {
    const { port, webpackDevServerPort, assets } = options;
    this.app.use(express.static(path.join(process.cwd(), 'public')));

    if (this.schema) {
      this.app.use(
        '/q',
        graphqlHTTP({
          schema: this.schema,
          graphiql: process.env.NODE_ENV !== 'production'
        })
      );
    }

    const wrap = fn => (...args) => fn(...args).catch(args[2]);

    if (this.routes) {
      this.app.get(
        '*',
        wrap(async (req, res, next) => {
          const html = await this.renderer(req.originalUrl, {
            context: req,
            assets
          });
          res.send(html);
        })
      );
    }

    this.app.use(function(err, req, res, next) {
      console.error(err);
      res.status(500).send(err);
    });

    return this.app.listen(port, () => {
      console.log(`==> listening on ${port}`);
    });
  }
}

export default options => new App(options);
