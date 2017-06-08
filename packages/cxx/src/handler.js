import React from 'react';
import { graphql } from 'graphql';
import { renderToString } from 'react-dom/server';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  createOperationSelector,
  getOperation
} from 'relay-runtime';
import normalizeHref from './normalize-href';
import createMatcher from './matcher';
import QueryRenderer from './query-renderer';
import html from './html';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default ({ routes, schema }, options) =>
  wrap(async (req, res, next) => {
    const source = new RecordSource();
    const store = new Store(source);
    const handleProvider = null;
    const fetchQuery = async (
      operation,
      variables,
      cacheConfig,
      uploadables
    ) => {
      const result = await graphql(schema, operation.text, {}, req, variables);
      // todo: error
      if (result.errors) {
        console.error(result.errors);
      }
      return result;
    };
    const network = Network.create(fetchQuery);
    const environment = new Environment({
      handleProvider,
      network,
      store
    });

    const location = normalizeHref(req.originalUrl);

    // todo: more efficient matcher
    const matcher = createMatcher(routes);
    const matchLocation = matcher(location);

    // todo: customize 404
    if (!matchLocation) {
      return res.sendStatus(404);
    }

    // todo: code split
    // if (router.split) {
    //   router.component = (await router.split()).default;
    // }

    const { page } = matchLocation;

    if (page.query) {
      // todo
      const variables = page.variables ? page.variables(matchLocation) : {};
      const operation = createOperationSelector(
        getOperation(page.query),
        variables
      );

      environment.retain(operation.root);
      environment.sendQuery({
        operation,
        onCompleted: () => {
          const markup = renderToString(
            <QueryRenderer
              environment={environment}
              query={page.query}
              variables={variables}
              render={result => React.createElement(page.default, result)}
            />
          );

          res.send(
            html(markup, environment.getStore().getSource().toJSON(), options)
          );
        },
        onError: error => {
          console.log(error);
        }
      });
    } else {
      const markup = renderToString(<page.default />);

      res.send(html(markup, {}, options));
    }
  });
