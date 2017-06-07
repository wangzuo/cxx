import 'babel-polyfill';
import express from 'express';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import universalHandler from './handler';

class App {
  constructor(name, options = {}) {
    const { routes, schema } = options;
    this.name = name;
    this.routes = routes;
    this.schema = schema;
    // this.reducers = reducers;
    // this.Root = Root;
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

  use(route, fn) {
    if (fn) {
      this.app.use(route, fn);
    } else {
      this.app.use(route);
    }
  }

  start(options) {
    const { port, webpackDevServerPort, assets } = options;

    // todo
    this.app.use('/favicon.ico', (req, res) => {
      res.sendStatus(404);
    });

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
      console.log(`==> ${this.name} listening on ${port}`);
    });
  }
}

export default App;
