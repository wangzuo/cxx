import React from 'cxx/react';
import Link from 'cxx/link';
import Layout from '../components/layout';

/*
export const query = graphql`{ world }`;

export const variables = {};
*/

export default () =>
  <Layout title="World"><Link href="/">Back</Link><h1>World</h1></Layout>;
