import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import universalHandler from './handler';

class App {
  constructor(options = {}) {
    const { routes, schema } = options;
    this.routes = routes;
    this.schema = schema;
    this.options = options;
    this.init();
  }

  init() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    this.app = app;
  }

  use(...args) { this.app.use(...args); }
  get(...args) { this.app.get(...args); }
  post(...args) { this.app.post(...args); }

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

    if (this.routes) {
      this.app.get(
        '*',
        universalHandler(
          { routes: this.routes, schema: this.schema },
          { assets, webpackDevServerPort }
        )
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
