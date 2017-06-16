import React from 'react';
import { renderToString } from 'react-dom/server';
import { createOperationSelector, getOperation } from 'relay-runtime';
import html from './html';
import normalizeHref from './normalize-href';
import createMatcher from './matcher';
import QueryRenderer from './query-renderer';
import createServerEnvironment from './createServerEnvironment';

export default (routes = {}, schema) => {
  const matcher = createMatcher(routes);

  return async (href, options = {}) => {
    const context = options.context || null;
    const assets = options.assets || {};
    const location = normalizeHref(href);
    const matchLocation = matcher(location);

    if (!matchLocation) {
      return '404 not found';
    }

    const { page } = matchLocation;
    if (!page.query) {
      const markup = renderToString(<page.default />);
      return html(markup, {}, assets);
    }

    const variables = page.variables ? page.variables(matchLocation) : {};
    const operation = createOperationSelector(
      getOperation(page.query),
      variables
    );
    const environment = createServerEnvironment(schema, context);
    environment.retain(operation.root);
    await new Promise((resolve, reject) => {
      environment.sendQuery({
        operation,
        onCompleted: resolve,
        onError: reject
      });
    });

    const markup = renderToString(
      <QueryRenderer
        environment={environment}
        query={page.query}
        variables={variables}
        render={result => React.createElement(page.default, result)}
      />
    );

    const initial = environment.getStore().getSource().toJSON();

    return html(markup, initial, assets);
  };
};
