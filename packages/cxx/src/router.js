import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { createOperationSelector, getOperation } from 'relay-runtime';
import QueryRenderer from './query-renderer';
import normalizeHref from './normalize-href';
import createMatcher from './matcher';

export default class Router extends Component {
  static childContextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    const location = normalizeHref({
      pathname: props.history.location.pathname,
      search: props.history.location.search
    });

    this.matcher = createMatcher(props.routes);
    const match = this.matcher(location);

    if (match.query) {
      const variables = match.variables ? match.variables(match) : {};
      const operation = createOperationSelector(
        getOperation(match.query),
        variables
      );

      // todo
      this.props.environment.retain(operation.root);
    }

    this.state = { match };
  }

  getChildContext() {
    return {
      router: {
        history: this.props.history
      }
    };
  }

  componentWillMount() {
    const { routes, environment, history } = this.props;

    history.listen(location => {
      const match = this.matcher(normalizeHref(location));

      if (match.query) {
        const variables = match.variables ? match.variables(match) : {};
        const operation = createOperationSelector(
          getOperation(match.query),
          variables
        );

        if (environment.check(operation.root)) {
          this.setState({ match });
        } else {
          // todo: customize
          NProgress.start();
          // todo: retain?
          environment.retain(operation.root);
          environment.sendQuery({
            operation,
            onCompleted: () => {
              setTimeout(() => {
                this.setState({ match });
                NProgress.done();
              }, 1000);
            },
            onError: error => console.log(error)
          });
        }
      } else {
        this.setState({ match });
      }
    });
  }

  render() {
    const { environment } = this.props;
    const { match } = this.state;
    const variables = match.variables ? match.variables(match) : {};

    return (
      <QueryRenderer
        environment={environment}
        query={match.query}
        variables={variables}
        render={result => React.createElement(match.default, result)}
      />
    );
  }
}
