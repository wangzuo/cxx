import React from 'react';
import { connect } from 'react-redux';

const Root = ({ router }) => <router.component />;

const select = state => ({
  router: state.router
});

export default connect(select)(Root);
