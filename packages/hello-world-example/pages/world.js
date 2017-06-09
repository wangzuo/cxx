import React from 'react';
import Layout from '../components/layout';

export const query = graphql`query WorldQuery { world }`;

export default ({ props }) =>
  <Layout title="World">
    <h1>{props.world}</h1>
  </Layout>;
