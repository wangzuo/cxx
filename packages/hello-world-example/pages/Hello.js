import React from 'react';
import Layout from '../components/layout';

export const query = graphql`query HelloQuery { hello }`;

export default ({ props }) =>
  <Layout title="Hello">
    <h1>{props.hello}</h1>
  </Layout>;
