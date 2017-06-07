import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import Router from './router';
import environment from './environment';
import history from './history';

export default async ({ routes }) => {
  render(
    <Router environment={environment} routes={routes} history={history} />,
    document.getElementById('root')
  );
};
