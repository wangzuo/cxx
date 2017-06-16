import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Router from './router';
import environment from './environment';

export default async ({ routes }) => {
  const history = createHistory();

  if (typeof window !== 'undefined') {
    window.cxx = window.cxx || {};
    window.cxx.history = history;
  }

  render(
    <Router environment={environment} routes={routes} history={history} />,
    document.getElementById('__cxx__')
  );
};
