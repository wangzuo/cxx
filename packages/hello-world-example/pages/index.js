import React from 'react';
import Link from 'cxx/link';
import Layout from '../components/layout';

export default () =>
  <Layout title="Index">
    <h1>index</h1>
    <div>
      <Link href="/hello">hello</Link> &nbsp;
      <Link href="/world">world</Link>
    </div>
  </Layout>;
