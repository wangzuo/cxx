import React from 'cxx/react';
import Link from 'cxx/link';
import Layout from '../components/layout';

/*
export const query = graphql`{ hello }`;

export const variables = {};
*/

export default () =>
  <Layout title="Hello"><Link href="/">Back</Link><h1>Hello</h1></Layout>;
